from django.contrib import admin

from .models import DataNode, DataTable

admin.site.register(DataNode)
admin.site.register(DataTable)

# Register your models here.
