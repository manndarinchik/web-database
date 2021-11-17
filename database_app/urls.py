from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name = "index"),
    path('accounts/', include('django.contrib.auth.urls')),
    path('signup/', views.signup, name='signup'),
    path('administration/', views.admin, name='admin'),
]