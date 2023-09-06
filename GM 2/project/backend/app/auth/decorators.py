from flask_jwt_extended import jwt_required, current_user
from flask import make_response
from functools import wraps


def protected_route(role):
    def guard(f):
        @jwt_required()
        @wraps(f)
        def decorator(*args, **kwargs):
            if current_user.role == role:
                return f(*args, **kwargs)
            return make_response("You do not have permission to see this resource", 403)

        return decorator

    return guard


admin_protection = protected_route("Admin")
user_protection = protected_route("User")
