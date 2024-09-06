from flask_mail import Message
from api.mail.mail_config import mail
from flask import jsonify
import os
import traceback

def send_email(address, token):
   
    try:
  
        msg = Message("Reset your password",  # Asunto del correo
                      recipients=[address])  # Correo del destinatario

        # Definir cuerpo del correo, utilizamos la variable de entorno para PROD os.getenv("BACKEND_URL"), en DEV ponemos la del FRONT si estas usando codespace.
        print('-----------------------------',msg)
        if  os.getenv("FLASK_DEBUG") == "1":
            msg.html=f'''<h1>Reset your password</h1>
                        <p>Haz click para restablecer tu contraseña:</p>
                        <a href="https://legendary-space-guacamole-jpjrvwg6ww6cp7vw-3000.app.github.dev/resetpassword?token={token}">Reset password</a>
                        '''
        else: 
            msg.html=f'''<h1>Reset your password</h1>
                        <p>Haz click para restablecer tu contraseña:</p>
                        <a href="{os.getenv("BACKEND_URL")}/reset-password?token={token}">Reset password</a>
                        '''
            
        # Enviar el correo
        print('+++++++++++++++++++++++++++++',msg)
        mail.send(msg)
        return {'success': True, 'msg': 'correo enviado exitosamente'}
    except Exception as e:
        traceback.print_exc()

        print(e)
        return {'success': False, 'msg': 'error al enviar correo'}