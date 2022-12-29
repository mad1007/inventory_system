from rest_framework.serializers import ModelSerializer
from .models import Article, Category

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

    def to_representation(self, instance):
        obj = super().to_representation(instance)
        obj["category_name"] = instance.category.name
        return obj
