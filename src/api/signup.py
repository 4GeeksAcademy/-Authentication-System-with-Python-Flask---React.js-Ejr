from flask import Flask, request, jsonify
from api.models import db, User

app = Flask(__name__)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()

    name = data['name']
    email = data['email']
    password = data['password']

    user = User(name=name, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    response = {
        'status': 'success',
        'message': 'User created successfully'
    }

    return jsonify(response)
