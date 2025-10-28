from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'scenarios'

router = DefaultRouter()
router.register(r'', views.ScenarioViewSet, basename='scenario')

urlpatterns = [
    path('', include(router.urls)),
    path('simulate/', views.simulate_view, name='simulate'),
    path('simulate/multiple/', views.simulate_multiple_view, name='simulate_multiple'),
    path('<int:scenario_id>/results/', views.scenario_results_view, name='scenario_results'),
]

