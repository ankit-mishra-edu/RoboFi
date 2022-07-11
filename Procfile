release: sh -c 'cd ./backend/ && python manage.py migrate'
web: sh -c 'cd ./backend/ && uvicorn robofi.handlers.asgi:application --host 0.0.0.0 --port $PORT'
celeryworker: sh -c 'cd ./backend/ && celery -A robofi.celery worker --pool=solo -l info & cd ./backend/ && celery -A robofi.celery beat -l INFO'