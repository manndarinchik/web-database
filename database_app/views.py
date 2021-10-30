from django.shortcuts import render
from .models import Table


def index(request):

    table = Table.objects.all()



    return render(request, 'database_app/index.html', {'table': table})
