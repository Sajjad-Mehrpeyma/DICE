from django.db import models


class KPI(models.Model):
    """
    Represents a Key Performance Indicator
    """
    CATEGORY_CHOICES = [
        ('revenue', 'Revenue'),
        ('marketing', 'Marketing'),
        ('customer', 'Customer'),
        ('operations', 'Operations'),
    ]
    
    CHANGE_TYPE_CHOICES = [
        ('positive', 'Positive'),
        ('negative', 'Negative'),
        ('neutral', 'Neutral'),
    ]
    
    kpi_id = models.CharField(max_length=50, unique=True, primary_key=True)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    current_value = models.CharField(max_length=100)
    previous_value = models.CharField(max_length=100, blank=True)
    change_percent = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    change_type = models.CharField(max_length=20, choices=CHANGE_TYPE_CHOICES, default='neutral')
    unit = models.CharField(max_length=20, blank=True)  # $, %, units, etc.
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.kpi_id})"

    class Meta:
        db_table = 'kpis'
        ordering = ['category', 'title']


class Metric(models.Model):
    """
    Time-series data for KPIs
    """
    kpi = models.ForeignKey(KPI, on_delete=models.CASCADE, related_name='metrics')
    timestamp = models.DateTimeField()
    value = models.FloatField()
    dimensions = models.JSONField(default=dict, blank=True)  # channel, product, region, etc.
    
    def __str__(self):
        return f"{self.kpi.kpi_id} - {self.timestamp}"

    class Meta:
        db_table = 'metrics'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['kpi', '-timestamp']),
        ]


class Insight(models.Model):
    """
    AI-generated insights for KPIs
    """
    kpi = models.ForeignKey(KPI, on_delete=models.CASCADE, related_name='insights')
    content = models.TextField()
    generated_at = models.DateTimeField(auto_now_add=True)
    model_version = models.CharField(max_length=50, blank=True)
    confidence = models.FloatField(default=0.0)
    
    def __str__(self):
        return f"Insight for {self.kpi.kpi_id}"

    class Meta:
        db_table = 'insights'
        ordering = ['-generated_at']

