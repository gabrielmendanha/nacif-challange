from flask import Blueprint, jsonify, request
from .models import User
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

main = Blueprint('main', __name__)

@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if ('password' not in data) or ('username' not in data):
        return jsonify(message='Missing password or username'), 400

    user = User.query.filter_by(username=data['username']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify(message='Invalid password or username'), 401

    access_token = create_access_token(identity=f'{user.id}')
    return jsonify(access_token=access_token)