from os import environ


class CeleryConfig(object):

    # REDIS_HOST = "0.0.0.0"
    REDIS_HOST = 'redis'
    REDIS_PORT = '6379'
    broker_url = environ.get(
        "REDIS_URL",
        "redis://{host}:{port}".format(host=REDIS_HOST, port=str(REDIS_PORT)),
    )
    result_backend = broker_url

    timezone = "UTC"

    accept_content = ["json", "msgpack", "yaml"]
    task_serializer = "json"
    result_serializer = "json"
