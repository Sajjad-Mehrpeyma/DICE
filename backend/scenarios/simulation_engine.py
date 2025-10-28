"""
Simulation engine for scenario analysis
"""

import logging

logger = logging.getLogger(__name__)


class ElasticitySimulator:
    """
    Simple elasticity-based simulation engine
    """
    
    # Elasticity coefficients (how input changes affect outputs)
    ELASTICITIES = {
        'ad_spend': {
            'revenue': 0.7,
            'cac': 0.5,
            'roas': -0.3,
            'conversions': 0.6,
        },
        'price': {
            'revenue': 0.8,
            'conversions': -1.2,
            'units_sold': -1.5,
        },
        'product_quality': {
            'customer_satisfaction': 0.9,
            'retention_rate': 0.6,
            'clv': 0.8,
        },
        'marketing_channels': {
            'reach': 1.0,
            'engagement': 0.7,
            'conversions': 0.5,
        }
    }
    
    def simulate(self, parameter, change_percent, base_metrics):
        """
        Simulate impact of changing a parameter
        
        Args:
            parameter: The parameter being changed (e.g., 'ad_spend')
            change_percent: Percentage change in parameter
            base_metrics: Dictionary of current metric values
        
        Returns:
            List of simulation results
        """
        if parameter not in self.ELASTICITIES:
            logger.warning(f"Unknown parameter: {parameter}")
            return []
        
        results = []
        elasticities = self.ELASTICITIES[parameter]
        
        for metric, elasticity in elasticities.items():
            if metric in base_metrics:
                original_value = base_metrics[metric]
                
                # Calculate impact using elasticity
                # Impact % = Change % * Elasticity
                impact_percent = change_percent * elasticity
                
                # Calculate new value
                new_value = original_value * (1 + impact_percent / 100)
                
                results.append({
                    'parameter': metric,
                    'originalValue': original_value,
                    'newValue': round(new_value, 2),
                    'impact': round(impact_percent, 2),
                    'confidence': 0.75  # Fixed confidence for V1
                })
        
        return results
    
    def simulate_multiple_changes(self, changes, base_metrics):
        """
        Simulate multiple parameter changes
        
        Args:
            changes: List of dicts with 'parameter' and 'change_percent'
            base_metrics: Dictionary of current metric values
        
        Returns:
            Combined simulation results
        """
        all_results = {}
        
        for change in changes:
            parameter = change['parameter']
            change_percent = change['change_percent']
            
            results = self.simulate(parameter, change_percent, base_metrics)
            
            # Combine results (sum impacts for same metrics)
            for result in results:
                metric_name = result['parameter']
                if metric_name in all_results:
                    # Combine impacts
                    all_results[metric_name]['impact'] += result['impact']
                    all_results[metric_name]['newValue'] = result['originalValue'] * (
                        1 + all_results[metric_name]['impact'] / 100
                    )
                else:
                    all_results[metric_name] = result
        
        return list(all_results.values())


# Singleton instance
_simulator = None

def get_simulator():
    """
    Get singleton simulator instance
    """
    global _simulator
    if _simulator is None:
        _simulator = ElasticitySimulator()
    return _simulator

