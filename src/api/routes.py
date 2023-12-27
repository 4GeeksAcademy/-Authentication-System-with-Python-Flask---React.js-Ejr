"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Programs
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)



@api.route('/programs', methods=['GET'])
def get_all_programs():
    programs_list = Programs.query.all()
    programs_serialized = [program.serialize() for program in programs_list] 
    return jsonify(programs_serialized), 200

@api.route('/newProgram',methods=['POST'])
def new_program():
    data = request.get_json()

          
    new_program = Programs(
    name = data["name"],
    program_number = data["program_number"],
    description = data["description"],
    monday_start = data["monday_start"]
    ,monday_end = data["monday_end"]
    ,tuesday_start = data["tuesday_start"]
    ,tuesday_end = data["tuesday_end"]
    ,wednesday_start = data["wednesday_start"]
    ,wednesday_end = data["wednesday_end"]
    ,thursday_start = data["thursday_start"]
    ,thursday_end = data["thursday_end"]
    ,friday_start = data["friday_start"]
    ,friday_end = data["friday_end"]
    ,saturday_start = data["saturday_start"]
    ,saturday_end = data["saturday_end"]
    ,sunday_start = data["sunday_start"]
    ,sunday_end = data["sunday_end"]
    )
    db.session.add(new_program)
    db.session.commit()
    
    return jsonify("program created succesfully"), 200


@api.route("/updateProgram", methods=['PUT'])
def update_program():
    data = request.get_json()
    updated_programs = []

    for item in data:
        
        existing_program = Programs.query.filter_by(id=item.get("id")).first()

        if existing_program:
            existing_program.name = item.get("name",existing_program.name)
            existing_program.program_number = item.get("program_number",existing_program.program_number)
            existing_program.description = item.get("description",existing_program.description)
            existing_program.monday_start = item.get("monday_start",existing_program.monday_start)
            existing_program.monday_end = item.get("monday_end",existing_program.monday_end)
            existing_program.tuesday_start = item.get("tuesday_start",existing_program.tuesday_start)
            existing_program.tuesday_end = item.get("tuesday_end",existing_program.tuesday_end)
            existing_program.wednesday_start = item.get("wednesday_start",existing_program.wednesday_start)
            existing_program.wednesday_end = item.get("wednesday_end",existing_program.wednesday_end)
            existing_program.thursday_start = item.get("thursday_start",existing_program.thursday_start)
            existing_program.thursday_end = item.get("thursday_end",existing_program.thursday_end)
            existing_program.friday_start = item.get("friday_start",existing_program.friday_start)
            existing_program.friday_end = item.get("friday_end",existing_program.friday_end)
            existing_program.saturday_start = item.get("saturday_start",existing_program.saturday_start)
            existing_program.saturday_end = item.get("saturday_end",existing_program.saturday_end)
            existing_program.sunday_start = item.get("sunday_start",existing_program.sunday_start)
            existing_program.sunday_end = item.get("sunday_end",existing_program.sunday_end)

            db.session.commit()  
            updated_programs.append(existing_program)
    

    return jsonify([program.serialize() for program in updated_programs])

@api.route('/deleteProgram/<int:program_number>',methods=['DELETE'])
def delete_program(program_number):
    program = Programs.query.filter_by(program_number=program_number).first()
    if not program:
        return jsonify("program does not exists")
    else:
        db.session.delete(program)
        db.session.commit()

    remaining_programs = Programs.query.all()
    remaining_programs.sort(key=lambda p: p.program_number)

    for index, remaining_program in enumerate(remaining_programs):
        remaining_program.program_number = index + 1

    db.session.commit()


    return jsonify("program sucessfully deleted")
        

