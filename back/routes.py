from flask import Blueprint, jsonify, request
from .models import User, Todo
from .extensions import db
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

    access_token = create_access_token(identity=f'{user.username}')
    return jsonify(access_token=access_token)

@main.route('/todos', methods=['GET'])
@jwt_required()
def list_todos():
    user_id = get_jwt_identity()
    todos = Todo.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': t.id, 'title': t.title, 'completed': t.completed} for t in todos]), 200

@main.route('/todos', methods=['POST'])
@jwt_required()
def create_todo():
    user_id = get_jwt_identity()
    data = request.get_json()

    if ('title' not in data) or (not data['title']):
        return jsonify(message='Missing or empty title'), 400

    todo = Todo(title=data['title'], completed=data.get('completed', False if 'completed' not in data else data['completed']), user_id=user_id)

    db.session.add(todo)
    db.session.commit()

    return jsonify(id=todo.id, title=todo.title, completed=todo.completed), 201

@main.route('/todos/<int:todo_id>', methods=['PUT'])
@jwt_required()
def update_todo(todo_id):
    user_id = get_jwt_identity()
    todo = Todo.query.filter_by(id=todo_id, user_id=user_id).first()

    if not todo:
        return jsonify(message='Todo does not exist or not allowed for this user'), 400

    data = request.get_json()
    todo.title = data.get('title', todo.title)
    todo.completed = data.get('completed', todo.completed)
    db.session.commit()
    return jsonify(message='Updated successfully')

@main.route('/todos/<int:todo_id>', methods=['DELETE'])
@jwt_required()
def delete_todo(todo_id):
    user_id = get_jwt_identity()
    todo = Todo.query.filter_by(id=todo_id, user_id=user_id).first()

    if not todo:
        return jsonify(message='Todo does not exist or not allowed for this user'), 400

    db.session.delete(todo)
    db.session.commit()

    return jsonify(message='Deleted successfully'), 204