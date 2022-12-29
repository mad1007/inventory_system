from django.urls import path
from .views import ArticlesView, CategoriesView
urlpatterns = [
    path('categories/', CategoriesView.as_view()),
    path('articles/', ArticlesView.as_view()),
]
