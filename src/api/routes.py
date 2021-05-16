"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, Response
from api.models import db, User, Product, Client, ImageBlob, Products_View
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from werkzeug.utils import secure_filename
import random
import secrets
import json

api = Blueprint('api', __name__)

# Client/Seller registration
@api.route("/userregistration", methods=['POST'])
def register_user():

    username = request.json.get("username", None)
    fullname = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    phonenumber = request.json.get("phonenumber", None)
    usertype = request.json.get("usertype", None)

    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400
    
    if usertype == 1:

        client = Client.query.filter_by(username=username, password=password, isSeller=usertype).first()

        if client:
            return jsonify({"msg": "Seller already exists."}), 401
        else:
            new_seller = Client()
            new_seller.username = username
            new_seller.fullName = fullname
            new_seller.email = email
            new_seller.password = password
            new_seller.phoneNumber = phonenumber
            new_seller.isSeller = usertype

            db.session.add(new_seller)
            db.session.commit()
            return jsonify({"msg": "Seller account was successfully created."}), 200
    else:
        client = Client.query.filter_by(username=username, password=password, isSeller=usertype).first()

        if client:
            return jsonify({"msg": "Client already exists."}), 401
        else:
            new_client = Client()
            new_client.username = username
            new_client.fullName = fullname
            new_client.email = email
            new_client.password = password
            new_client.phoneNumber = phonenumber
            new_client.isSeller = usertype

            db.session.add(new_client)
            db.session.commit()
        return jsonify({"msg": "Client account was successfully created."}), 200

# user log in
@api.route('/userlogin', methods=['POST'])
def login_user():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    usertype = request.json.get("usertype", None)

    # valida si estan vacios los ingresos
    if username is None:
        return jsonify({"msg": "Please provide a valid username."}), 400
    if password is None:
        return jsonify({"msg": "Please provide a valid password."}), 400

    if usertype == 1:
        seller = Client.query.filter_by(username=username, password=password, isSeller=usertype).first()

        if seller is None:
            return jsonify({"msg": "Invalid username or password"}), 401
        else:
            # crear token
            my_token = create_access_token(identity=seller.username)
            return jsonify({"token": my_token,"userid": seller.id}), 200
    else:
        client = Client.query.filter_by(username=username, password=password, isSeller=usertype).first()

        if client is None:
            return jsonify({"msg": "Invalid username or password"}), 401
        else:
            # crear token
            my_token = create_access_token(identity=client.username)
            return jsonify({"token": my_token}), 200

# user forgot password
@api.route("/forgotpassword", methods=["POST"])
def returnPassword():
    email = request.json.get("email", None)

    if email is None:
        return jsonify({"msg": "Please provide a valid email."}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        recoverKey = "pur@v1d@m@rt" + str(secrets.token_hex(16))
        user.password = recoverKey
        db.session.commit()

        return jsonify(recoverKey), 200

    else:
        return jsonify({"msg": "Your email is not register in our records."}), 404


# get user password reset
@api.route("/resetpassword", methods=["POST"])
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
        user.password = newPassword
        db.session.commit()
        return jsonify({"msg": "Password has been successfully changed."}), 200


# create new product
@api.route("/createproduct", methods=["POST"])
@jwt_required()
def addNewProduct():
    current_id = get_jwt_identity()
    sellerid = request.json.get("sellerid", None)
    productName = request.json.get("productname", None)
    description = request.json.get("description", None)
    category = request.json.get("category", None)
    price = request.json.get("price", None)
    item_status = request.json.get("itemstatus", None)

    if productName is None:
        return jsonify({"msg": "Please provide a valid Product Name."}), 400
    if description is None:
        return jsonify({"msg": "Please enter a valid description"}), 400
    if category is None:
        return jsonify({"msg": "Please enter a valid category"}), 400
    if price is None:
        return jsonify({"msg": "Please enter a valid price"}), 400
    if item_status is None:
        return jsonify({"msg": "Please enter a valid item status"}), 400
    else:
        new_product = Product()
        new_product.productName = productName
        new_product.fk_id = sellerid
        new_product.description = description
        new_product.category = category
        new_product.price = price
        new_product.item_status = item_status

        db.session.add(new_product)
        db.session.commit()
        return jsonify({"msg": "The product has being successfully registered."}), 200

# delete product
@api.route("/deleteproduct/<id>", methods=["DELETE"])
@jwt_required()
def deleteProduct(id):
    current_id = get_jwt_identity()
    delproduct = Product.query.get(id)
    if delproduct is None:
        raise APIException("There is not product to delete", status_code=404)

    db.session.delete(delproduct)
    db.session.commit()
    return jsonify({"msg": "The product has being successfully deleted."}), 200

# update product
@api.route("/updateproduct/<id>", methods=["PUT"])
@jwt_required()
def updateProduct(id):
    current_id = get_jwt_identity()
    productName = request.json.get("productname", None)
    description = request.json.get("description", None)
    category = request.json.get("category", None)
    price = request.json.get("price", None)
    item_status = request.json.get("item_status", None)

    if productName is None:
        return jsonify({"msg": "Please provide a valid Product Name."}), 400
    if description is None:
        return jsonify({"msg": "Please enter a valid description"}), 400
    if category is None:
        return jsonify({"msg": "Please enter a valid category"}), 400
    if price is None:
        return jsonify({"msg": "Please enter a valid price"}), 400
    if item_status is None:
        return jsonify({"msg": "Please enter a valid item status"}), 400

    updatedProduct = Product.query.filter_by(id=id).first()
    updatedProduct.productName = productName
    updatedProduct.description = description
    updatedProduct.category = category
    updatedProduct.price = price
    updatedProduct.item_status = item_status

    db.session.commit()
    return jsonify({"msg": "The product has being successfully updated."}), 200

# images upload
@api.route('/uploadimage', methods=['POST'])
def imgUpload():
    #img = request.files['pic']
    img = request.files['pic']
    productId = 1
    if not img:
        return 'No image was uploaded!', 400

    filename = secure_filename(img.filename)
    mimetype = img.mimetype
    

    if not filename or not mimetype:
        return 'Bad upload!', 400

    new_img = ImageBlob()
    new_img.img = img.read()
    new_img.name = filename
    new_img.mimetype = mimetype
    new_img.fk_id = productId

    db.session.add(new_img)
    db.session.commit()

    return jsonify({"msg": "Image has been uploaded."}), 200

# get images
@api.route('getimage/<int:id>', methods=['GET'])
def getImg(id):
    img = ImageBlob.query.filter_by(id=id).first()
    if not img:
        return 'Img Not Found!', 404

    return Response(img.img, mimetype=img.mimetype)

# get products
@api.route('/getproducts', methods=['GET'])
def products():    
    myProducts = db.session.query(Product).join(Client, Product.fk_id == Client.id).all()
    myProducts =  list(map(lambda prd: prd.serialize() , myProducts))
    print(myProducts)
    return jsonify({"results":myProducts, "message":"Seller Products"}), 200
