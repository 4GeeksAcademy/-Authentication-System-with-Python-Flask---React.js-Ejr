# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def recoveryPasswordTemplate(token, email):
    return Mail(
    from_email= os.getenv("SENDGRID_SENDER"),
    to_emails='to@example.com',
    subject='Recuperacion de clave',
    html_content='Para recuperar la contraseña haga click <a href = "'+os.getenv("FRONTEND_URL")+
    "/changepassword?token="+token+'"aqui</a> ')

def sendMail(message):
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)