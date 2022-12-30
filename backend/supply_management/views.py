from rest_framework.views import APIView
from .models import Category, Article
from .serializers import ArticleSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework import pagination
from rest_framework import generics

class MyPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })


class StandardResultsSetPagination(MyPagination):
    page_size = 200
    page_size_query_param = 'page_size'
    max_page_size = 1000

class CategoriesView(generics.ListAPIView):
    queryset = Category.objects.all().order_by("-id")
    serializer_class = CategorySerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return super().get_queryset().order_by("id")

class ArticlesView(generics.ListAPIView):
    queryset = Article.objects.select_related("category").all().order_by("-id")
    serializer_class = ArticleSerializer
    pagination_class = StandardResultsSetPagination
