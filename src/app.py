"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request,jsonify, session
from flask_bcrypt import Bcrypt
from api.config import ApplicationConfig
from flask_session import Session
from api.models import db, User

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user ():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "sin autorizacion"}), 401
        
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })
@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Correo registrado"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first() is not None

    if user is None:
        return jsonify({"error": "Sin autorizacion"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Sin autorizacion"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

if __name__ == "__main__":
    app.run(debug=True)
