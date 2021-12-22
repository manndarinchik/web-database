from django.db import models


class DataNode(models.Model):
    def __str__(self):
        # отображение нода в консоли и утилитах  
        return "At {}:{} - {}; id - {}".format(self.row_pos, self.column_pos, self.data, self.pk)

    data = models.CharField(max_length=200, default="data")
    row_pos = models.IntegerField(default=0)
    column_pos = models.IntegerField(default=0)


class DataTable(models.Model):
    class Meta:
        permissions = (
            ("can_edit", "Is able to interact with tables"),
            ("can_view", "Is able to view tables")
        )

    def __str__(self):
        # отображение нода в консоли и утилитах  
        return self.name

    name = models.CharField(max_length=200)
    nodes = models.ManyToManyField(DataNode)
