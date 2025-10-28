from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Scenario, SimulationResult
from .serializers import (ScenarioSerializer, SimulateRequestSerializer, 
                          MultiSimulateRequestSerializer, SimulationResultSerializer)
from .simulation_engine import get_simulator
from core.responses import success_response, error_response
import logging

logger = logging.getLogger(__name__)


class ScenarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing scenarios
    """
    serializer_class = ScenarioSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Scenario.objects.filter(created_by=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    def list(self, request):
        """
        List all scenarios for current user
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return success_response(serializer.data)
    
    def create(self, request):
        """
        Create a new scenario
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return success_response(
                serializer.data,
                message="Scenario created successfully",
                status_code=status.HTTP_201_CREATED
            )
        return error_response("Invalid data", errors=serializer.errors)
    
    def retrieve(self, request, pk=None):
        """
        Get a specific scenario with results
        """
        scenario = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = self.get_serializer(scenario)
        return success_response(serializer.data)
    
    def destroy(self, request, pk=None):
        """
        Delete a scenario
        """
        scenario = get_object_or_404(self.get_queryset(), pk=pk)
        scenario.delete()
        return success_response(message="Scenario deleted successfully")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def simulate_view(request):
    """
    Run a simulation
    """
    serializer = SimulateRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return error_response("Invalid simulation request", errors=serializer.errors)
    
    parameter = serializer.validated_data['parameter']
    change_percent = serializer.validated_data['change_percent']
    base_metrics = serializer.validated_data['base_metrics']
    scenario_name = serializer.validated_data.get('scenario_name', f'{parameter} +{change_percent}%')
    
    # Run simulation
    try:
        simulator = get_simulator()
        results = simulator.simulate(parameter, change_percent, base_metrics)
        
        if not results:
            return error_response(f"Unknown parameter: {parameter}")
        
        # Save scenario
        scenario = Scenario.objects.create(
            name=scenario_name,
            created_by=request.user,
            parameters={
                'parameter': parameter,
                'change_percent': change_percent,
                'base_metrics': base_metrics
            }
        )
        
        # Save results
        for result in results:
            SimulationResult.objects.create(
                scenario=scenario,
                output_metric=result['parameter'],
                original_value=result['originalValue'],
                new_value=result['newValue'],
                impact_percent=result['impact'],
                confidence=result['confidence']
            )
        
        response_data = {
            'scenario_id': scenario.id,
            'scenario_name': scenario.name,
            'results': results
        }
        
        return success_response(response_data, message="Simulation completed successfully")
    
    except Exception as e:
        logger.error(f"Simulation error: {str(e)}")
        return error_response(
            "Simulation failed. Please try again.",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def simulate_multiple_view(request):
    """
    Run simulation with multiple parameter changes
    """
    serializer = MultiSimulateRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return error_response("Invalid simulation request", errors=serializer.errors)
    
    changes = serializer.validated_data['changes']
    base_metrics = serializer.validated_data['base_metrics']
    scenario_name = serializer.validated_data.get('scenario_name', 'Multi-parameter scenario')
    
    try:
        simulator = get_simulator()
        results = simulator.simulate_multiple_changes(changes, base_metrics)
        
        # Save scenario
        scenario = Scenario.objects.create(
            name=scenario_name,
            created_by=request.user,
            parameters={
                'changes': changes,
                'base_metrics': base_metrics
            }
        )
        
        # Save results
        for result in results:
            SimulationResult.objects.create(
                scenario=scenario,
                output_metric=result['parameter'],
                original_value=result['originalValue'],
                new_value=result['newValue'],
                impact_percent=result['impact'],
                confidence=result['confidence']
            )
        
        response_data = {
            'scenario_id': scenario.id,
            'scenario_name': scenario.name,
            'results': results
        }
        
        return success_response(response_data, message="Multi-parameter simulation completed")
    
    except Exception as e:
        logger.error(f"Multi-simulation error: {str(e)}")
        return error_response(
            "Simulation failed. Please try again.",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def scenario_results_view(request, scenario_id):
    """
    Get results for a specific scenario
    """
    try:
        scenario = Scenario.objects.get(id=scenario_id, created_by=request.user)
        results = scenario.results.all()
        serializer = SimulationResultSerializer(results, many=True)
        return success_response(serializer.data)
    except Scenario.DoesNotExist:
        return error_response("Scenario not found", status_code=status.HTTP_404_NOT_FOUND)

