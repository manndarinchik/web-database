from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import DataNode


def index(request):
    querry = DataNode.objects.all()
    nodes = list(querry)
    template = loader.get_template('database_app/index.html')

    # Найти границы таблицы
    data_w = 0
    data_h = 0
    for entry in nodes:
        data_h = entry.row_pos    if entry.row_pos    > data_h else data_h
        data_w = entry.column_pos if entry.column_pos > data_w else data_w
    data_w += 1
    data_h += 1
    data = [[None]*data_w]*data_h

    # Заполнить таблицу ячейками
    # TODO: почему оно блять всегда последний запрос в БД по всей таблице распихивает
    for entry in nodes:
        data[entry.row_pos][entry.column_pos] = entry.data

    context = {
        "table": data,
    }
    return HttpResponse(template.render(context, request))
