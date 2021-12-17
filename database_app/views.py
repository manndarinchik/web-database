from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import DataNode, DataTable
from .forms import SignUpForm, ChangePermissionsform
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import authenticate, login


@login_required
def home(request):
    #получение таблицы
    name_table = request.GET.get('table')
    #tables = DataTable.objects.filter(name=name_table)
    table = DataTable.objects.get(name=name_table)
    name = table.name

    #return render(request, 'database_app/rab.html', {'tables': rab})
    # администрирование
    context = {
        "user": request.user,
        "no_permissions": False,
        "name": name,
    }

    user_groups = request.user.groups.all()
    if not len(user_groups):
        context.update({"no_permissions": True})
        context.update({"user_group": "- отсутствует"})
    else:
        context.update({"user_group": user_groups[0].name})
        

    nodes = DataNode.objects.all()


    # Вместо data_h и data_w теперь data_row (максимальное количество строк) и data_column (максимальное количество столбцов)
    def max_table(nodes):
        data_row = 0
        data_column = 0
        for entry in nodes:
            if entry.row_pos > data_row:
                data_row = entry.row_pos
            if entry.column_pos > data_column:
                data_column = entry.column_pos
        return int(data_row) + 1, int(data_column) + 1

    # Найти границы таблицы
    # Вместо data_h и data_w теперь data_row (максимальное количество строк) и data_column (максимальное количество столбцов)
    data_row, data_column = max_table(nodes)

    data = [0] * data_row

    for i in range(data_row):
        data[i] = [0] * data_column
    # Заполнить таблицу ячейками

    for entry in nodes:
        data[entry.row_pos][entry.column_pos] = entry.data

    context.update({"table": data})
    # Приём данных

    if request.method == 'POST':
        row = 0
        col = 0
        max_col = int(request.POST['agent'])

        values = request.POST.getlist('ourInput')
        #print(values, len(values))
        max_row = int(len(values) / max_col)
        all_row, all_column = max_table(nodes)


        if (all_row > max_row):
            for i in range(max_row, all_row):
                for j in range(all_column):
                    DataNode.objects.get(row_pos=i, column_pos=j).delete()
                all_row -= 1

        if (max_col - 1 < all_column):
            for i in range(max_col, all_column):
                for j in range(all_row):
                    DataNode.objects.get(row_pos=j, column_pos=i).delete()

        for elem in values:
            try:
                DataNode.objects.get(row_pos=str(row), column_pos=str(col))
                obj = DataNode.objects.get(row_pos=str(row), column_pos=str(col))
                obj.data = elem
                obj.save()

            except:
                #newNode =
                #newNode.save()

                #print(newNode)
                table.nodes.add(DataNode.objects.create(row_pos=str(row), column_pos=str(col), data=elem))


            if (col == max_col - 1):
                col = 0
                row += 1
                continue
            col += 1
        san = "./?table="+name_table
        return redirect(san)

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


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()  

            user.save()
            raw_password = form.cleaned_data.get('password1')
 
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
 
            return redirect('/')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})

def admin(req):
    if req.method == 'POST':

        form = ChangePermissionsform(req.POST)
        if form.is_valid():
            user = User.objects.get(id=req.POST['user'])
            permissions = req.POST['permissions']
            
            g = user.groups.all()
            if len(g):
                g[0].user_set.remove(user)
                user.groups.clear()

            if permissions != '0':
                new_group = Group.objects.get(id=permissions)
                                
                print(permissions, new_group)
                new_group.user_set.add(user)
                user.groups.set([new_group])

            print(user.groups.all())

            return render(req, 'database_app/admin.html', {
                'form': form,
                'changed': True, 
                'changed_user': user.username,
                'changed_perm': permissions
            })
            
    else:
        form = ChangePermissionsform()

    return render(req, 'database_app/admin.html', {'form': form,  'changed': False})

@login_required
def alltables(request):
    tables = DataTable.objects.all()
    context = {
        "user": request.user,
        "no_permissions": False,
        "tables": tables,
    }

    user_groups = request.user.groups.all()
    if not len(user_groups):
        context.update({"no_permissions": True})
        context.update({"user_group": "- отсутствует"})
    else:
        context.update({"user_group": user_groups[0].name})
    return render(request, 'database_app/alltables.html', context)



