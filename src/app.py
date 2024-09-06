"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import JWTManager, create_access_token,get_jwt_identity, jwt_required
from flask import Flask
from flask_mail import Mail, Message
from flask_cors import CORS
from datetime import timedelta

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'infoloopy10@gmail.com'
app.config['MAIL_PASSWORD'] = 'yloz aavj knib yzve'


mail = Mail(app)
CORS(app)
# Configuración de entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# Configuración de Bcrypt
bcrypt = Bcrypt(app) 

# Configuración de JWT
app.config["JWT_SECRET_KEY"] = "super-secret"  # Cambia esto!
jwt = JWTManager(app)

# Configuración de base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

# Tu endpoint para enviar correos de restablecimiento de contraseña
@app.route('/send-reset-email', methods=['POST'])
def send_reset_email():
    email=request.json.get('email')
    user=User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "usuario no encontrado"})
    token=create_access_token(identity=user.id,expires_delta=timedelta(minutes=5))

    template_html = f"""
    <html>
        <body>
            <h1>Reset your password</h1>
            <p>Haz click para restablecer tu contraseña:</p>
            <a href="https://glowing-space-telegram-g4xj494v99jv2pgwj-3000.app.github.dev/resetpassword?token={token}">Reset password</a>
        </body>
    </html>
    """
    msg=Message(
        "Reset your password",
        sender="noreply@example.com",
        recipients=[user.email],
        html=template_html
    )
    mail.send(msg)
    return jsonify({"msg":"Email sent"}), 200

# Tu endpoint para restablecer la contraseña
@app.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    # Implementar la lógica para verificar el token y restablecer la contraseña
    # Mostrar el formulario o manejar el restablecimiento de la contraseña
    pass

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# bcrypt config
bcrypt = Bcrypt(app) 


# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)


   
