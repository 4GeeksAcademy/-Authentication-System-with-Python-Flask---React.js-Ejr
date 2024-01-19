from flask import Flask, request, jsonify, session, g
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
#need to change this for a secure key
app.secret_key = "your_secret_key"  
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

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
    