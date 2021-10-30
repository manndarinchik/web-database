from django.shortcuts import render
from .models import Table


def index(request):

    table = Table.objects.order_by("name")



    return render(request, 'database_app/index.html', {'table': table})
