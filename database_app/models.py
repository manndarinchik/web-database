from django.db import models


class Table(models.Model):
    name = models.CharField('Имя и Фамилия', max_length = 100)
    date = models.DateTimeField('Дата рождения')
    cost = models.CharField('Цена', max_length=100)

    def __str__(self):
        return self.name