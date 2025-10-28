"""
Development settings
"""

from .base import *

DEBUG = True

# Allow all hosts in development
ALLOWED_HOSTS = ['*']

# Development-specific apps
INSTALLED_APPS += [
    # Add any dev-only apps here
]

# Simpler logging for development
LOGGING['root']['level'] = 'DEBUG'
LOGGING['loggers']['django']['level'] = 'DEBUG'

# Allow SQLite fallback for local development without PostgreSQL
if os.getenv('USE_SQLITE', 'False') == 'True':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

