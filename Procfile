release: sh -c 'cd ./backend/ && python manage.py migrate'
web: sh -c 'cd ./backend/ && hypercorn robofi.handlers.asgi:application --bind 0.0.0.0:$PORT'
celeryworker: sh -c 'cd ./backend/ && celery -A robofi.celery worker & celery -A robofi.celery beat --pool=solo -l INFO & wait -n'