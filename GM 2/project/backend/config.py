class Config(object):
    TESTING = False
    PROFILE = True

    FRONTEND_URL = "https://app.pressjockey.com/"
    BACKEND_URL = "https://app.pressjockey.com/api/"
    CORS_HEADERS = "Content-Type"
    broker_url = "redis://redis:6379"
    result_backend = broker_url

    timezone = "UTC"

    accept_content = ["json", "msgpack", "yaml"]
    task_serializer = "json"
    result_serializer = "json"

    MAX_CONTENT_LENGTH = 16 * 1000 * 1000


class ProductionConfig(Config):
    SQLALCHEMY_POOL_SIZE = 10
    SQLALCHEMY_MAX_OVERFLOW = 20


class TestConfig(Config):

    TESTING = True

    REDIS_HOST = "redis"
    REDIS_PORT = "6379"
    broker_url = "redis://redis:6379"
