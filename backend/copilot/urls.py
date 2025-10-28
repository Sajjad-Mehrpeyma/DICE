from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'copilot'

router = DefaultRouter()
router.register(r'sessions', views.ChatSessionViewSet, basename='session')

urlpatterns = [
    path('', include(router.urls)),
    path('query/', views.chat_query_view, name='query'),
    path('history/<int:session_id>/', views.chat_history_view, name='history'),
    path('sessions/<int:session_id>/clear/', views.clear_session_view, name='clear_session'),
]

