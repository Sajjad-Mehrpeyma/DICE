from django.db import models
from django.contrib.auth.models import User


class Scenario(models.Model):
    """
    Represents a business scenario for simulation
    """
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scenarios')
    parameters = models.JSONField(default=dict)  # Input parameters for simulation
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'scenarios'
        ordering = ['-created_at']


class SimulationResult(models.Model):
    """
    Results of a scenario simulation
    """
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE, related_name='results')
    output_metric = models.CharField(max_length=100)
    original_value = models.FloatField()
    new_value = models.FloatField()
    impact_percent = models.FloatField()
    confidence = models.FloatField(default=0.75)
    calculated_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.scenario.name} - {self.output_metric}"

    class Meta:
        db_table = 'simulation_results'
        ordering = ['-calculated_at']

