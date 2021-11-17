from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
 
class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email' ,'username', 'password1', 'password2')

class ChangePermissionsform(forms.Form):
    user = forms.ModelChoiceField(
        required=True,
        label="Пользователь",
        widget=forms.Select,
        queryset=User.objects.all(),
    )
    permissions = forms.ChoiceField(
        required= True,
        label="Уровень доступа",
        widget=forms.RadioSelect,
        choices=[
            ('0', 'Без доступа'),
            ('3', 'Наблюдатель'),
            ('2', 'Редактор'),
            ('1', 'Администратор')
        ]
    )
