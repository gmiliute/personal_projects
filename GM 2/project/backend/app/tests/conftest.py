import pytest
from ..extensions import db as _db
from .. import create_app


@pytest.fixture(scope="function")
def app():
    app = create_app()
    return app


@pytest.fixture(scope="function")
def db(app):
    _db.app = app

    with app.app_context():
        _db.create_all()

    yield _db

    _db.session.close()
    _db.drop_all()
