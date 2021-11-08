from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import DataNode, DataTable


# Create your views here.

def home(request):
    nodes = DataNode.objects.all()
    #nodes = table.nodes.all()

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

    context = {
        "table": data,
        #"table_name": table.name,
        #"table_id": table.id
    }

    # Приём данных

    if request.method == 'POST':
        row = 0
        col = 0
        max_col = int(request.POST['agent'])

        values = request.POST.getlist('ourInput')


        for elem in values:

            try:

                DataNode.objects.get(row_pos=str(row), column_pos=str(col))
                obj = DataNode.objects.get(row_pos=str(row), column_pos=str(col))
                obj.data = elem
                obj.save()
            except:
                DataNode.objects.create(row_pos=str(row), column_pos=str(col), data=elem)




            if (col == max_col - 1):
                col = 0
                row += 1
                continue
            col += 1

        return redirect('index')

    return render(request, 'database_app/index.html', context)




def recieve_table(req, data, table_id):
    # Принимаемые данные - двумерный массив строк.

    table = DataTable.objects.get(table_id)

    for i in range(len(data)):
        for j in range(len(data[0])):
            # Пробуем взять нод по адресу
            node = DataNode.objects.get(row_pos = i, column_pos = j)
            if node:
                # Если нод существует, то перезаписать в нем данные 
                if node.data != data[i][j]:
                    node.data = data[i][j]
                    node.save()
            else:
                # Если нод не существует, то создать нод и добавить его в таблицу
                node = DataNode(data=data, row_pos=i, column_pos=j)
                node.save()
                table.nodes.add(node)

    # Удаление лишних данных
    for node in table.nodes.order_by('-row_pos'):
        # Сортируем все ноды в таблице по индексу положения в строчке по убыванию. Если индекс больше длинны
        # строк полученной от пользователя таблицы - нод удаляется.
        if node.row_pos >= len(data[0]):
            table.nodes.remove(node)
            node.delete()
        else:
            break
    for node in table.nodes.order_by('-column_pos'):
        # Сортируем все ноды в таблице по индексу положения в столбце по убыванию. Если индекс больше длинны
        # столбцев полученной от пользователя таблицы - нод удаляется.
        if node.column_pos >= len(data):
            table.nodes.remove(node)
            node.delete()
        else:
            break


    # Сохранить изменения в таблице
    table.save()

    return HttpResponse('')

