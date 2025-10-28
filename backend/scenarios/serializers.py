from rest_framework import serializers
from .models import Scenario, SimulationResult


class SimulationResultSerializer(serializers.ModelSerializer):
    """
    Serializer for SimulationResult model
    """
    class Meta:
        model = SimulationResult
        fields = ['id', 'output_metric', 'original_value', 'new_value', 
                  'impact_percent', 'confidence', 'calculated_at', 'metadata']


class ScenarioSerializer(serializers.ModelSerializer):
    """
    Serializer for Scenario model
    """
    results = SimulationResultSerializer(many=True, read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = Scenario
        fields = ['id', 'name', 'description', 'parameters', 'created_by', 
                  'created_by_username', 'created_at', 'updated_at', 'results']
        read_only_fields = ['created_by', 'created_at', 'updated_at']


class SimulateRequestSerializer(serializers.Serializer):
    """
    Serializer for simulation request
    """
    parameter = serializers.CharField(required=True)
    change_percent = serializers.FloatField(required=True)
    base_metrics = serializers.DictField(required=True)
    scenario_name = serializers.CharField(required=False, allow_blank=True)


class MultiSimulateRequestSerializer(serializers.Serializer):
    """
    Serializer for multiple parameter simulation
    """
    changes = serializers.ListField(
        child=serializers.DictField(),
        required=True
    )
    base_metrics = serializers.DictField(required=True)
    scenario_name = serializers.CharField(required=False, allow_blank=True)

