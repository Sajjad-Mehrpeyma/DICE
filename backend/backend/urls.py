"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .health import health_check

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/health/', health_check, name='health_check'),
    path('api/v1/auth/', include('authentication.urls')),
    path('api/v1/copilot/', include('copilot.urls')),
    path('api/v1/sources/', include('sources.urls')),
    path('api/v1/dashboard/', include('dashboard.urls')),
    path('api/v1/scenarios/', include('scenarios.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
