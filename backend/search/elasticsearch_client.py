from elasticsearch import Elasticsearch
from django.conf import settings

es = Elasticsearch([settings.ES_HOST])