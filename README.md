# web-database
Простенькое веб-приложение для хранения и обработки таблиц. Сделано первокурсниками с кучей энтузиазма и минимум опыта, просьба отнестись к коду с пониманием 🕯

Установка:
1. Создать venv, установить в него django с помощью "pip install django"
2. Активировать venv в папке с проектом
3. Создать базу данных с помощью 'python manage.py makemigrations' и 'python mamange.py migrate'
4. Создать суперпользователя с помощью 'python manage.py createsuperuser'
5. Запустить сервер с помощью 'python manage.py runserver'
6. Зайти в админку django на  127.0.0.1:8000/admin c логином и паролем суперпользователя
7. Создать 3 группы пользователей на 127.0.0.1:8000/admin/auth/group/:
 - "admins" c правами "database_app | data table | Is able to interact with tables" 
                      "database_app | data table | Is able to view tables"
                      "auth | группа | Can change group"
 - "contributors" c правами "database_app | data table | Is able to interact with tables" 
                            "database_app | data table | Is able to view tables"
 - "observers" c правами "database_app | data table | Is able to view tables"
 8. Присвоить суперпользователю группу 'admins'
 
 Теперь с помощью аккаунта суперпользователя можно войти в приложение и создать первую таблицу. Новых пользователей можно регистрировать внутри приложения, суперпользователь должен будет дать им доступ в админке приложения.
