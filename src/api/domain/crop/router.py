from flask import Flask, request, jsonify, url_for, Blueprint
from api.models.crops import Crop
import api.domain.crop.controller as Controller
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_jwt_extended import get_jwt_identity , jwt_required, get_jwt


api = Blueprint("api/crop", __name__)

@api.route('/addFarm', methods=['POST'])
@jwt_required()
def post_crop():
    user = get_jwt_identity()
    user_id = user['id']
    body = request.get_json()
    crop = Controller.post_crop(body,user_id)
    return jsonify(crop.serialize())


# Get crops from an ID    
@api.route('/', methods=['GET'])
@jwt_required()
def get_farmer_crops():
    user = get_jwt_identity()
    user_id = user['id']
    user_role = user['role']
    print (user_role)
    if user_role == "farmer":
        farmer_crops = Controller.get_farmer_crops(user_id) 
        return jsonify(farmer_crops)
    else:
        return jsonify('Not allowed profile')   


#Delete Crop from an ID
@api.route('/<int:crop_id>', methods=['DELETE'])
@jwt_required()
def delete_crop(crop_id):
    crop = Crop.query.get(crop_id)
    deleted_crop = Controller.delete_crop(crop)
    return jsonify("crop deleted succesfully",200)

#Modify Crop from an ID
@api.route('/<int:crop_id>', methods=['PUT'])
@jwt_required()
def modify_crop(crop_id):
    crop = Crop.query.get(crop_id)
    modified_crop=Controller.modify_crop(crop)
    return jsonify(modified_crop)