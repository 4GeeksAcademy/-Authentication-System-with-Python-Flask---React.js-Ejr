import os
from flask import Flask, request, jsonify, Blueprint
from flask_migrate import Migrate
from flask_cors import CORS
from utils import APIException
from models import db, User, Business_user, Offers, Trip
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies

api = Blueprint('api', _name_)

bcrypt = Bcrypt()
db = SQLAlchemy()
jwt = JWTManager()

@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@api.route('/')
def sitemap():
    return generate_sitemap(api)


from flask import Flask, request, jsonify
from flask_restful import Api
from flask_jwt_extended import create_access_token, JWTManager
from sqlalchemy.orm.exc import NoResultFound
from models import User, Business_user
import bcrypt

app = Flask(__name__)
api = Api(app)

# Set the secret key to use with Flask-JWT-Extended.
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)



@api.route('/token', methods=['POST'])
def get_token():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        try:
            # Check if the provided email exists in the User table
            login_user = User.query.filter_by(email=email).one()
            password_db_user = login_user.password
            user_password_correct = bcrypt.check_password_hash(password_db_user, password)
        except NoResultFound:
            user_password_correct = False

        try:
            # Check if the provided email exists in the Business_user table
            login_business = Business_user.query.filter_by(email=email).one()
            password_db_business = login_business.password
            business_password_correct = bcrypt.check_password_hash(password_db_business, password)
        except NoResultFound:
            business_password_correct = False

        if user_password_correct and not business_password_correct:
            user_id = login_user.id
            access_token = create_access_token(identity=user_id)
            return jsonify({'access_token': access_token}), 200

        elif business_password_correct and not user_password_correct:
            # Handle the scenario when the password is correct for the business user
            business_user_id = login_business.id
            access_token = create_access_token(identity=business_user_id)
            return jsonify({'access_token': access_token}), 200

        else:
            return jsonify({'error': 'Incorrect Password'}), 401
    
    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500


 # Admin route   
@api.route('/admin', methods=['GET'])
@jwt_required()
def admin_dashboard():
    is_admin = get_jwt_identity()['is_admin']
    if is_admin:
        users = User.query.all()
        business = business.query.all()
        return jsonify({
            'users': [user.serialize() for user in users],
            'business_users': [business.serialize() for business in business]
        }), 200
    else:
        return jsonify({'error': 'Unauthorized'}), 401
    

# admin can delete users and companies
@api.route('/admin/delete/<string:resource>/<int:resource_id>', methods=['DELETE'])
@jwt_required()
def delete_resource(resource, resource_id):
    is_admin = get_jwt_identity()['is_admin']
    if is_admin:
        if resource == 'users':
            resource_instance = User.query.get(resource_id)
        elif resource == 'companies':
            resource_instance = business.query.get(resource_id)
        else:
            return jsonify({'error': 'Invalid resource type'}), 400

        if resource_instance:
            db.session.delete(resource_instance)
            db.session.commit()
            return jsonify({'message': f'{resource[:-1].capitalize()} deleted successfully'}), 200
        else:
            return jsonify({'error': f'{resource[:-1].capitalize()} not found'}), 404
    else:
        return jsonify({'error': 'Unauthorized'}), 401
    
    

# Update companies perfil
@api.route('/business/profile', methods=['PUT'])
@jwt_required()
def update_business_profile():
    try: 
        current_business_id = get_jwt_identity()
        business = business.query.get(current_business_id)

        if not business:
            return jsonify({'error': 'business not found'}), 400
        
        data = request.get_json()

        # Update business profile data
        business.name_business = data.get('name_business', business.name_business)
        business.email = data.get('email', business.email)
        business.tin = data.get('tin', business.tin)
        business.address = data.get('address', business.address)
        business.payment_method = data.get('payment_method', business.payment_method)

        db.session.commit()

        return jsonify({'message': 'business profile updated successfully', 'business': business.serialize()}), 200
    
    except Exception as e:
        return jsonify({'error': 'Error in updating business profile' + str(e)}), 500


# this only runs if `$ python src/api.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    api.run(host='0.0.0.0', port=PORT, debug=False)
