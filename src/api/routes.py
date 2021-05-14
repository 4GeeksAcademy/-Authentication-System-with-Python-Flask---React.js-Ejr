"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Seller, Client
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token 
import random
import secrets

api = Blueprint('api', __name__)

# user registration
@api.route("/userregistration", methods=['POST'])
def register_user():

    username = request.json.get("username", None)
    fullname = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400
    
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({"msg": "User already exists."}), 401
    else:
        new_user = User()
        new_user.username = username
        new_user.fullName = fullname
        new_user.email = email
        new_user.password = password
        new_user.is_Admin = True

        db.session.add(new_user)
        db.session.commit()
    return jsonify({"msg": "User account was successfully created."}), 200

# user log in
@api.route('/userlogin', methods=['POST']) 
def login_user():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # valida si estan vacios los ingresos
    if username is None:
        return jsonify({"msg": "Please provide a valid username."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400
        
    user = User.query.filter_by(username=username, password=password).first()

    if user is None:
        return jsonify({"msg": "Invalid username or password"}), 401
    else:
        # crear token
        my_token = create_access_token(identity=user.username)
        return jsonify({"token": my_token}), 200

# user forgot password
@api.route("/forgotPassword", methods=["POST"])
def returnPassword():
    email = request.json.get("email", None)    
    
    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    
    user =  User.query.filter_by(email=email).first()
    
    if user:
        recoverKey="pur@v1d@m@rt" + str(secrets.token_hex(16))
        user.password=recoverKey
        db.session.commit() 

        return jsonify(recoverKey), 200        
       
    else:   
        return jsonify({"msg": "Your email is not register in our records."}), 404       
 
 
# get user password reset
@api.route("/reset", methods=["POST"])
def resetPassword():
    email = request.json.get("email", None)
    tempPassword = request.json.get("tempPassword", None)
    newPassword = request.json.get("newPassword", None)    

    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if tempPassword is None:
        return jsonify({"msg": "Invalid temporary password"}), 400
    if newPassword is None:
        return jsonify({"msg": "Please provide a new password"}), 400

    user = User.query.filter_by(email=email, password=tempPassword).first()
    if user is None:
        return jsonify({"msg": "Invalid username or password"}), 401
    else:
        user.password=newPassword
        db.session.commit()
        return jsonify({"msg": "Password has been successfully changed."}), 200


# Función para registrar producto
@api.route("/newproduct", methods=["POST"])
def addNewProduct():
    productName = request.json.get("productname", None)
    description = request.json.get("description", None)
    category = request.json.get("category", None)
    price = request.json.get("price", None)  
    image = request.json.get("image", None)
    item_status = request.json.get("item_status", None) 


    if productName is None:
        return jsonify({"msg": "Please provide a valid Product Name."}), 400
    if description is None:
        return jsonify({"msg": "Please enter a valid description"}), 400
    if category is None:
        return jsonify({"msg": "Please enter a valid category"}), 400
    if price is None:
        return jsonify({"msg": "Please enter a valid price"}), 400
    if image is None:
        return jsonify({"msg": "Please enter a valid image"}), 400
    if item_status is None:
        return jsonify({"msg": "Please enter a valid item status"}), 400
    else:
        new_product=Product()
        new_product.productName=productName
        new_product.fk_id=1
        new_product.description=description
        new_product.category=category
        new_product.price=price
        new_product.image=image
        new_product.item_status=item_status

        db.session.add(new_product)     
        db.session.commit()
        return jsonify({"msg": "The product has being successfully registered."}), 200

    # Función para eliminar producto


@api.route("/deleteproduct/<id>", methods=["DELETE"])
def deleteProduct(id):
    delproduct = Product.query.get(id)
    if delproduct is None:
        raise APIException("There is not product to delete", status_code=404)

    db.session.delete(delproduct)     
    db.session.commit()
    return jsonify({"msg": "The product has being successfully deleted."}), 200


    # Función para actualizar producto


@api.route("/update/<id>", methods=["PUT"])
def updateProduct(id):
    productName = request.json.get("productname", None)
    description = request.json.get("description", None)
    category = request.json.get("category", None)
    price = request.json.get("price", None)  
    image = request.json.get("image", None)
    item_status = request.json.get("item_status", None)

    if productName is None:
        return jsonify({"msg": "Please provide a valid Product Name."}), 400
    if description is None:
        return jsonify({"msg": "Please enter a valid description"}), 400
    if category is None:
        return jsonify({"msg": "Please enter a valid category"}), 400
    if price is None:
        return jsonify({"msg": "Please enter a valid price"}), 400
    if image is None:
        return jsonify({"msg": "Please enter a valid image"}), 400
    if item_status is None:
        return jsonify({"msg": "Please enter a valid item status"}), 400

    updatedProduct = Product.query.filter_by(id=id).first()
    updatedProduct.productName=productName
    updatedProduct.description=description
    updatedProduct.category=category
    updatedProduct.price=price
    updatedProduct.image=image
    updatedProduct.item_status=item_status
       
    db.session.commit()
    return jsonify({"msg": "The product has being successfully updated."}), 200


