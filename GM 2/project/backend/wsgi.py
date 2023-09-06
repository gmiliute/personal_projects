import os

from app import create_app, db
import sqlalchemy as sa
from sqlalchemy import exc, or_

app = create_app()
app.app_context().push()
# if sa.inspect(sa.engine).get_table_names() == []:
print("Loading backend app.")
try:
    print("Trying to connect to and create db tables.")
    db.create_all()
    print("Succeeded")
except exc.IntegrityError:
    print("Failed to connect to and create db tables.")
    db.session.rollback()  # test data

print("DONE DONE DONE!!!!!!!")
