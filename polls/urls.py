from django.urls import path

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('<int:quetion_id>/', views.detail, name='detail'),
    path('<int:quetion_id>/results/', views.results, name='results'),
    path('<int:quetion_id>/vote/', views.vote, name='vote'),
]
