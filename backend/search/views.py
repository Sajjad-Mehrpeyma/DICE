from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .elasticsearch_client import es

@api_view(['POST'])
def search_news(request):
    try:
        query = request.data.get('query', '')
        from_date = request.data.get('from_date', None)
        to_date = request.data.get('to_date', None)
        priority_level = request.data.get('priority_level', [])
        impact = request.data.get('impact', [])
        journals = request.data.get('journals', [])
        sort_by = request.data.get('sort_by', 'date')

        es_query = {
            "bool": {
                "must": [],
                "filter": []
            }
        }

        if query:
            es_query["bool"]["must"].append({
                "multi_match": {
                    "query": query,
                    "fields": ["title^3", "content", "category.major", "src"],
                    "type": "most_fields"
                    # Search for full text
                    # "type": "phrase"
                }
            })

        if from_date and to_date:
            es_query["bool"]["filter"].append({
                "range": {"date": {"gte": from_date, "lte": to_date}}
            })

        if priority_level:
            es_query["bool"]["filter"].append({"terms": {"priority_level.keyword": priority_level}})

        if impact:
            es_query["bool"]["filter"].append({"terms": {"impact.keyword": impact}})

        if journals:
            es_query["bool"]["filter"].append({"terms": {"src.keyword": journals}})

        res = es.search(
            index="news",
            body={
                "query": es_query,
                "sort": [{sort_by: {"order": "desc"}}],
                "_source": {"excludes": ["content_vector"]}
            }
        )

        hits = [
            hit["_source"] | {"_id": hit["_id"], "_score": hit["_score"]}
            for hit in res["hits"]["hits"]
        ]

        return Response({"results": hits}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
