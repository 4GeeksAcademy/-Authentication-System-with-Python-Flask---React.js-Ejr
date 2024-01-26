from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    is_promoter = db.Column(db.Boolean, default=False)

db.create_all()

# Registration endpoint
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    is_promoter = data.get('is_promoter', False)

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email is already registered'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(first_name=first_name, last_name=last_name, email=email,
                    password=hashed_password, is_promoter=is_promoter)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id, expires_delta=False)
        return jsonify({'access_token': access_token, 'is_promoter': user.is_promoter}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

# Protected endpoint for promoters
@app.route('/api/create_event', methods=['POST'])
@jwt_required()
def create_event():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user and current_user.is_promoter:
        return jsonify({'message': 'Event created successfully'}), 201
    else:
        return jsonify({'message': 'Permission denied'}), 403

# Protected endpoint for regular users
@app.route('/api/view_events', methods=['GET'])
@jwt_required()
def view_events():
    return jsonify({'message': 'Viewing events'}), 200

if __name__ == '__main__':
    app.run(debug=True)
