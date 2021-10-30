from django.db import models

# Create your models here.

class DataNode(models.Model):
    def __str__(self):
        # отображение нода в консоли и утилитах  
        return "At {}:{} - {}".format(self.row_pos, self.column_pos, self.data)

    data = models.CharField(max_length=200)
    row_pos = models.IntegerField(default=0)
    column_pos = models.IntegerField(default=0)