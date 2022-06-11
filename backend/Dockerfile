# Temporary Build stage
FROM python:3.9.13-alpine3.15 AS builder

WORKDIR /usr/src/app/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
    
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev

RUN \
  apk add --no-cache postgresql-libs && \
  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
  apk --purge del .build-deps

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt


# Final stage to accumulate required dependencies
FROM python:3.9.13-alpine3.15

COPY --from=builder /opt/venv /opt/venv

WORKDIR /usr/src/app/backend

ENV PATH="/opt/venv/bin:$PATH"

COPY . .