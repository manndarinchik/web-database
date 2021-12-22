from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.all_tables, name='alltables'),  # все таблицы
    path('table/', views.home, name="index"),  # таблица
    path('accounts/', include('django.contrib.auth.urls')),  # вход
    path('signup/', views.signup, name='signup'),  # регистрация
    path('administration/', views.admin, name='admin'),  # администрирование
    path('delete/', views.delete_table, name='deletetable'),  # удаление таблицы
    path('create/', views.create_table, name='createtable'),  # создание таблицы
]
