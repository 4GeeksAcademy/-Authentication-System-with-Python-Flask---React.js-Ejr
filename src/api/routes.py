"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, send_from_directory
from api.models import db, User, Baby, Report, Blog_recipe, Blog_news
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.utils import secure_filename
import os

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#[POST] Login
@api.route('/login' ,methods=["POST"])
def login():
    email = request.json.get('email',None)
    password = request.json.get('password', None)
    user = User.query.filter_by (email=email).first()
    if user:
        if (user.password == password):
            access_token = create_access_token(identity=user.id)
            return jsonify({'success' : True, 'user':user.serialize(), 'token' :access_token }), 200
        return jsonify({'success' : False, 'msg':'usuario o contraseña no válidos'}), 400
    return jsonify({'success' : False,  'msg' : 'El correo electrónico no existe'}), 404


#[POST] Signup
@api.route('/signup', methods=['POST'])
def signup():
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email or not password or not username:
        return jsonify({'success': False, 'msg': 'Faltan datos para el registro'}), 400
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'success': False, 'msg': 'Este correo electrónico ya tiene una cuenta'}), 400
    new_user = User(username=username, email=email, password=password, is_admin=False)  # Considera si is_admin debe ser true o false por defecto
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    return jsonify({'success': True, 'user': new_user.serialize(), 'token': access_token}), 200


#[GET] Token
@api.route('/token', methods=['GET'])
@jwt_required()
def check_jwt():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify({'success' : True, 'user': user.serialize()}), 200
    return jsonify({'success' : False, 'msg': 'Bad Token'}), 401


#[Get] Protected
@api.route('/protected', methods=['GET'])
@jwt_required()
def handle_protected():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
         return jsonify({'msg' : 'Has logrado acceder a una ruta protegida, ' + user})
    return jsonify({'Success' : False, 'msg' : 'Bad Token'})

#[GET] Listar todos los bebes que hay en la base de datos.
@api.route('/all_babies', methods=['GET'])
def get_all_babies():
    bebe = Baby.query.all()
    aux = list(map(lambda x: x.serialize(), bebe))
    return jsonify({'msg': 'OK', 'data': aux}), 200   

#[GET] Muestra la información de un solo bebe según su id.
@api.route('/one_baby/<int:id>', methods=['GET'])
def get_one_baby(id):
    bebe = Baby.query.get(id)
    return jsonify({'msg': 'OK', 'bebe': bebe.serialize()}), 200

#[GET] Muestra la información de un solo bebe según su nombre.
@api.route('/one_baby_by_name/<string:name>', methods=['GET'])
def get_one_baby_by_name(name):
    baby=Baby.query.filter_by(name=name).first()
    if baby is None:
        return jsonify({'msg': 'Baby not found'}), 404
    return jsonify({'msg': 'OK', 'data': baby.serialize()}), 200

#[PUT] Editar los datos de un bebe
@api.route('/edit_baby/<int:id>', methods=['PUT'])
def edit_baby(id):
    baby = Baby.query.get(id)
    if baby is None:
        return jsonify({'msg': 'Baby not found'}), 404
        
    data = request.json
    baby.name = data['name']
    baby.gender = data['gender']
    baby.age = data['age']
    baby.height = data['height']
    baby.weight = data['weight']
    #baby.avatar_path = data['avatar_path']

    db.session.commit()
    return jsonify({'msg': 'Datos del bebe editado', 'data': baby.serialize()}), 200    
    
#[POST] Nuevo Blog
@api.route('/new_blog', methods=['POST'])
def new_blog():
    data = request.json
    blog_type = data.get('type')
    author_id = data.get('author')
    title = data.get('title')
    img_header = data.get('img_header')
    img_final = data.get('img_final')
    source = data.get('source')

    if blog_type == 'recipe':
        text_intro = data.get('text_intro')
        text_ingredients = data.get('text_ingredients')
        text_steps = data.get('text_steps')
        # Si los campos obligatorios están vacíos, retorna un error 422
        if not (text_intro and text_ingredients and text_steps):
            return jsonify({"error": "Missing recipe fields"}), 422
        new_blog = Blog_recipe(
            author=author_id,
            title=title,
            img_header=img_header,
            text_intro=text_intro,
            text_ingredients=text_ingredients,
            text_steps=text_steps,
            img_final=img_final,
            source=source
        )
    elif blog_type == 'news':
        text = data.get('text')
        if not text:
            return jsonify({"error": "Missing news content"}), 422
        new_blog = Blog_news(
            author=author_id,
            title=title,
            img_header=img_header,
            text=text,
            img_final=img_final,
            source=source
        )
    else:
        return jsonify({"error": "Invalid blog type"}), 400

    try:
        db.session.add(new_blog)
        db.session.commit()
        return jsonify({"message": "Blog created successfully", "blog_id": new_blog.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#[PUT] Editar Blog
@api.route('/edit_blog/<string:type>/<int:id>', methods=['PUT'])
def edit_blog(type, id):

    # Obtener datos de la solicitud
    data = request.json
    title = data.get('title')
    img_header = data.get('img_header')
    img_final = data.get('img_final')
    source = data.get('source')

    # Buscar el blog en la base de datos según el tipo
    if type == 'news':
        blog = Blog_news.query.get(id)
        if not blog:
            return jsonify({"error": "News blog not found"}), 404
        blog.text = data.get('text', blog.text)
    elif type == 'recipe':
        blog = Blog_recipe.query.get(id)
        if not blog:
            return jsonify({"error": "Recipe blog not found"}), 404
        blog.text_intro = data.get('text_intro', blog.text_intro)
        blog.text_ingredients = data.get('text_ingredients', blog.text_ingredients)
        blog.text_steps = data.get('text_steps', blog.text_steps)
    else:
        return jsonify({"error": "Invalid blog type"}), 400

    # Actualizar los campos comunes
    blog.title = title
    blog.img_header = img_header
    blog.img_final = img_final
    blog.source = source

    try:
        db.session.commit()
        return jsonify({"message": "Blog updated successfully", "blog_id": blog.id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#[DELETE] Borrar Blog
@api.route('/delete_blog/<string:type>/<int:id>', methods=['DELETE'])
def delete_blog(type, id):
    
    # Eliminar el blog en función del tipo
    if type == 'news':
        blog = Blog_news.query.get(id)
        if not blog:
            return jsonify({"error": "News blog not found"}), 404
    elif type == 'recipe':
        blog = Blog_recipe.query.get(id)
        if not blog:
            return jsonify({"error": "Recipe blog not found"}), 404
    else:
        return jsonify({"error": "Invalid blog type"}), 400

    db.session.delete(blog)
    db.session.commit()
    
    return jsonify({"message": "Blog deleted successfully"}), 200

#[GET] Ver todos los blogs
@api.route('/blog', methods=['GET'])
def get_all_blogs():
    news_blogs = Blog_news.query.all()
    recipe_blogs = Blog_recipe.query.all()
    
    all_blogs = news_blogs + recipe_blogs
    
    serialized_blogs = [blog.serialize() for blog in all_blogs]
    
    return jsonify({'msg': 'OK',
                    'data': serialized_blogs})


#[GET] Ver un blog (id)
@api.route('/blog/<string:type>/<int:id>', methods=['GET'])
def get_blog(type, id):
    
    if type == 'recipe':
        blog = Blog_recipe.query.get(id)
    elif type == 'news':
        blog = Blog_news.query.get(id)
    else:
        return jsonify({'msg': 'Blog type not recognized'}), 400

    if blog:
        serialized_blog = blog.serialize()
        return jsonify({'msg': 'OK', 'data': serialized_blog}), 200
    return jsonify({'msg': 'Blog not found'}), 404

# [POST] agregar imagen

api = Blueprint('api', __name__)
UPLOAD_FOLDER = 'uploads'
# Asegúrate de que la carpeta de uploads existe
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
@api.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    return jsonify({"filePath": f"/uploads/{filename}"})

@api.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)



            
               
