from django.urls import path
from .views import search_news

urlpatterns = [
    path('news/search/', search_news, name='search_news'),
]
