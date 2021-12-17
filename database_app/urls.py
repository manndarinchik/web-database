from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.alltables, name='alltables'), #все таблицы
    #path('', views.home, name="index"), #таблица
    path('table/', views.home, name="index"), #таблица
    path('accounts/', include('django.contrib.auth.urls')), #вход
    path('signup/', views.signup, name='signup'), #регистрация
    path('administration/', views.admin, name='admin'), #администрирование
    path('alltables/', views.alltables, name='alltables'), #все таблицы
]
