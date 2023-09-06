# start by pulling the python image
FROM python:3.8-alpine
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN apk update && apk add bash
RUN apk add build-base && apk add libffi-dev
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip

# copy the requirements file into the image
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# copy from local to image
COPY . /app
EXPOSE 5000
RUN chmod u+x ./docker-entrypoint.sh

# configure and execute container
ENTRYPOINT ["./docker-entrypoint.sh"]