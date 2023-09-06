import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from app import app, db


app.config.from_object(os.environ["APP_SETTINGS"])

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command("db", MigrateCommand)


def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


manager.add_command("create_db", create_db)


if __name__ == "__main__":
    manager.run()
