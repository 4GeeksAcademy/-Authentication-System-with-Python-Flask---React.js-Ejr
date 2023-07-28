# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def recoveryPasswordTemplate(token, email):
    message= Mail(
        from_email=os.getenv("SENDGRID_SENDER"),
        to_emails=email,
        subject='Recuperacion de clave',
        html_content='Para recuperar contraseña haga click <a href="'+ os.getenv("FRONTEND_URL") + '/changepassword?token='+ token +'">aqui</a>')
    return sendMail(message)

def sendMail(message):
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return True
    except Exception as e:
        print(e)
        return False