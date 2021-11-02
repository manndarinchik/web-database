from django.db import models
from django.db.models.fields.reverse_related import ManyToManyRel, ManyToOneRel

# Create your models here.

class DataNode(models.Model):
    def __str__(self):
        # отображение нода в консоли и утилитах  
        return "At {}:{} - {}".format(self.row_pos, self.column_pos, self.data)

    data = models.CharField(max_length=200, default="data")
    row_pos = models.IntegerField(default=0)
    column_pos = models.IntegerField(default=0)

class DataTable(models.Model):
    def __str__(self):
        # отображение нода в консоли и утилитах  
        return self.name

    name = models.CharField(max_length=200, default="Table")
    nodes = models.ManyToManyField(DataNode)