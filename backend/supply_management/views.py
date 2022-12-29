from rest_framework.views import APIView
from .serializers import ArticleSerializer, CategorySerializer
from rest_framework.response import Response

class CategoryViews(APIView):
    def post(self, request):
        '''Create new article'''
        data = request.data
        article_serializer = CategorySerializer(data=data)
        if article_serializer.is_valid():
            article_serializer.save()
            return Response(article_serializer.data)
        else:
            return Response(article_serializer.errors, status=400)


class ArticleViews(APIView):
    def post(self, request):
        '''Create new article'''
        data = request.data
        article_serializer = ArticleSerializer(data=data)
        if article_serializer.is_valid():
            article_serializer.save()
            return Response(article_serializer.data)
        else:
            return Response(article_serializer.errors, status=400)
