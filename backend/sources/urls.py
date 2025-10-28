from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'sources'

router = DefaultRouter()
router.register(r'datasources', views.DataSourceViewSet, basename='datasource')
router.register(r'documents', views.DocumentViewSet, basename='document')

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', views.upload_file_view, name='upload_file'),
    path('uploads/', views.uploaded_files_view, name='uploaded_files'),
    path('webhook/n8n/', views.n8n_webhook_view, name='n8n_webhook'),
]

