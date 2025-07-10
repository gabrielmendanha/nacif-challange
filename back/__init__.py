from flask import Flask
from .routes import main
from .extensions import db
from .models import User
from werkzeug.security import generate_password_hash

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    app.register_blueprint(main)

    with app.app_context():
        db.create_all()
        new_user = User(username='admin', password=generate_password_hash('admin', method='pbkdf2'))
        db.session.add(new_user)
        db.session.add(new_user)
        db.session.commit()

    return app