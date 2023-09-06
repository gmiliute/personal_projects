FROM --platform=linux/amd64 python:3.8-slim AS compile-image
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev python-dev gcc git
RUN python -m venv /opt/venv
RUN pip install --upgrade pip

ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt

FROM --platform=linux/amd64 python:3.8-slim AS build-image
COPY --from=compile-image /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl gnupg

RUN adduser etherder
ENV PYTHONUNBUFFERED 1


ENV FLASK_APP wsgi.py
ENV FLASK_ENV development
ENV PROMETHEUS_MULTIPROC_DIR="/tmp"


EXPOSE 5000
USER etherder
COPY . /app
ENTRYPOINT ["/app/services/web/remote/entrypoint.sh"]