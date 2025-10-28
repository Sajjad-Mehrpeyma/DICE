from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'dashboard'

router = DefaultRouter()
router.register(r'kpis', views.KPIViewSet, basename='kpi')

urlpatterns = [
    path('', include(router.urls)),
    path('overview/', views.dashboard_overview_view, name='overview'),
    path('kpis/<str:kpi_id>/insight/', views.kpi_insight_view, name='kpi_insight'),
    path('kpis/<str:kpi_id>/metrics/', views.kpi_metrics_view, name='kpi_metrics'),
]

