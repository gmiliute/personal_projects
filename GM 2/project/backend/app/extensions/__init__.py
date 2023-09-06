import flask
import os
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from sqlalchemy import MetaData
from flask_mail import Mail
import redis
from celery import Celery

from app.celeryconfig import CeleryConfig


class FlaskCelery(Celery):
    def __init__(self, *args, **kwargs):

        super(FlaskCelery, self).__init__(*args, **kwargs)
        self.patch_task()

        if "app" in kwargs:
            self.init_app(kwargs["app"])

    def patch_task(self):
        TaskBase = self.Task
        _celery = self

        class ContextTask(TaskBase):
            abstract = True

            def __call__(self, *args, **kwargs):
                if flask.has_app_context():
                    return TaskBase.__call__(self, *args, **kwargs)
                else:
                    with _celery.app.app_context():
                        return TaskBase.__call__(self, *args, **kwargs)

        self.Task = ContextTask

    def init_app(self, app):
        self.app = app
        self.config_from_object(CeleryConfig)


def redis_client():
    return redis.Redis()


convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}
metadata = MetaData(naming_convention=convention)


def metrics_decorator(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        if "Authorization" in flask.request.headers and flask.request.headers[
            "Authorization"
        ] == "Key " + os.environ.get("PROMETHEUS_SECRET", "prometheus"):
            return f(*args, **kwargs)
        return flask.Response(status=403)

    return decorator


jwt = JWTManager()
db = SQLAlchemy(metadata=metadata)
cors = ""  # CORS()
mail = Mail()
migrate = Migrate(compare_type=True)
ma = Marshmallow()
celery = FlaskCelery()
stripe_products, stripe = [], object
twitter_bearer_token = ''
