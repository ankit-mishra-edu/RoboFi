FROM python:3.9.13-alpine3.15

WORKDIR /usr/src/app/backend

COPY requirements.txt .

RUN \
  apk add --no-cache postgresql-libs && \
  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
  python3 -m pip install -r requirements.txt --no-cache-dir && \
  apk --purge del .build-deps