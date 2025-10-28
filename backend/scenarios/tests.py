from django.test import TestCase
from django.contrib.auth.models import User
from .models import Scenario, SimulationResult
from .simulation_engine import ElasticitySimulator


class ScenariosTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.scenario = Scenario.objects.create(
            name='Test Scenario',
            created_by=self.user,
            parameters={'parameter': 'ad_spend', 'change_percent': 10}
        )
    
    def test_scenario_creation(self):
        self.assertEqual(self.scenario.name, 'Test Scenario')
        self.assertEqual(self.scenario.created_by, self.user)
    
    def test_simulation_result_creation(self):
        result = SimulationResult.objects.create(
            scenario=self.scenario,
            output_metric='revenue',
            original_value=10000.0,
            new_value=10700.0,
            impact_percent=7.0,
            confidence=0.75
        )
        self.assertEqual(result.scenario, self.scenario)
        self.assertEqual(result.impact_percent, 7.0)
    
    def test_elasticity_simulator(self):
        simulator = ElasticitySimulator()
        base_metrics = {
            'revenue': 10000,
            'cac': 50,
            'roas': 5.0
        }
        results = simulator.simulate('ad_spend', 10, base_metrics)
        
        self.assertGreater(len(results), 0)
        self.assertTrue(any(r['parameter'] == 'revenue' for r in results))

