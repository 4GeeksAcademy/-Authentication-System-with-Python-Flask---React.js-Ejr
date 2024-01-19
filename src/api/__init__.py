from flask import Flask, request, jsonify, session, g
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
#need to change this for a secure key
app.secret_key = "your_secret_key"  
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

#datevase Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
       # Default to 'user' if not specified maybe I need to modify it to specify the type of user whe are having custumer and promoter
    user_type = db.Column(db.String(20), default='user') 
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

# Create tables here all the users and respective keys
db.create_all()

# Registration API
@app.route('/api/register', methods=['POST'])
def register_api():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type', 'user')  # Default to 'user' if not specified
#function to verify if the email is register to the website and see if they are registerd or used the right password or email
    if email and password:
        if not User.query.filter_by(email=email).first():
            new_user = User(email=email, password=password, user_type=user_type)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': 'Welcome! Lets get this party going!'}), 201
        else:
            return jsonify({'message': 'Email already exists'}), 400
    else:
        return jsonify({'message': 'Invalid request'}), 400
    # Login API
@app.route('/api/login', methods=['POST'])
def login_api():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if email and password:
        user = User.query.filter_by(email=email, password=password).first()
        if user:
            session['user_id'] = user.id
            return jsonify({'message': 'Login successful', 'user_type': user.user_type}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    else:
        return jsonify({'message': 'Invalid request'}), 400
    # Protected route - Check if user is authenticated
def authenticate_route(func):
    def wrapper(*args, **kwargs):
        if g.user:
            return func(*args, **kwargs)
        else:
            return jsonify({'message': 'Unauthorized'}), 401
    return wrapper

# Promoter permission middleware
def is_promoter(func):
    def wrapper(*args, **kwargs):
        if g.user and g.user.user_type == 'promoter':
            return func(*args, **kwargs)
        else:
            return jsonify({'message': 'Permission denied'}), 403
    return wrapper

# Example route with promoter permission
@app.route('/promoter_page', methods=['GET'])
@authenticate_route
@is_promoter
def promoter_page():
    return jsonify({'message': 'Welcome to the Promoter Page!'}), 200

# Example route for regular user
@app.route('/user_page', methods=['GET'])
@authenticate_route
def user_page():
    return jsonify({'message': 'Welcome to the User Page!'}), 200

if __name__ == '__main__':
    app.run(debug=True)