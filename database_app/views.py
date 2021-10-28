from django.shortcuts import render


def new(request):
    return render(request, 'database_app/index.html')
