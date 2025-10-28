from django.contrib import admin
from .models import Scenario, SimulationResult


class SimulationResultInline(admin.TabularInline):
    model = SimulationResult
    extra = 0
    readonly_fields = ['calculated_at']


@admin.register(Scenario)
class ScenarioAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_by', 'created_at']
    list_filter = ['created_at', 'created_by']
    search_fields = ['name', 'description', 'created_by__username']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [SimulationResultInline]


@admin.register(SimulationResult)
class SimulationResultAdmin(admin.ModelAdmin):
    list_display = ['id', 'scenario', 'output_metric', 'impact_percent', 'confidence', 'calculated_at']
    list_filter = ['calculated_at', 'output_metric']
    search_fields = ['scenario__name', 'output_metric']
    readonly_fields = ['calculated_at']

