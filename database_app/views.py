from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import DataNode

# Create your views here.

def home(request):
    querry = DataNode.objects.all()
    nodes = list(querry)
    template = loader.get_template('database_app/index.html')
    print(nodes)
    # Найти границы таблицы
    data_w = 0
    data_h = 0

    for entry in nodes:
        if entry.row_pos > data_h:
            data_h = entry.row_pos
        if entry.column_pos > data_w:
            data_w = entry.column_pos

    data_w += 1
    data_h += 1
    data = [0] * data_h

    for i in range(data_h):
        data[i] = [0] * data_w
    # Заполнить таблицу ячейками

    for entry in nodes:

        data[entry.row_pos][entry.column_pos] = entry.data
        print(data)

    context = {
        "table": data,
    }

    return HttpResponse(template.render(context, request))