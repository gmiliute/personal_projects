from flask import Blueprint, jsonify, make_response, request, redirect, current_app

auth = Blueprint("auth", __name__, url_prefix="/api/auth/")


@auth.route('/callback/', methods=['POST', 'GET'])
def auth_callback():
    if request.method.lower() == 'post':
        data = request.get_json()
    else:
        data = request.query_string
    return make_response(jsonify(data))
