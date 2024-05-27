import os, smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

APP_ACCOUNT= os.environ.get("APP_GMAIL_ACCOUNT", None)
APP_PASSWORD= os.environ.get("APP_GMAIL_PASSWORD", None)

def send_verification_email(data):

  message = MIMEMultipart()
  message["Subject"] = "Email verification code @ Keqqu"

  html= open("src/backend/template/verification.html",'r').read()
  html = html.replace("%_0_%", data['username'])
  html = html.replace("%_1_%", data['email'])
  html = html.replace("%_2_%", data['vericode'])
  message.attach(MIMEText(html, "html"))

  send_email(message, data['email'])

def send_recovery_email(data):

  message = MIMEMultipart()
  message["Subject"] = "Account recovery code @ Keqqu"

  html= open("src/backend/template/recovery.html",'r').read()
  html = html.replace("%_0_%", data['username'])
  html = html.replace("%_1_%", data['email'])
  html = html.replace("%_2_%", data['passcode'])
  message.attach(MIMEText(html, "html"))

  send_email(message, data['email'])

def send_email(message, dest):

  if APP_ACCOUNT and APP_PASSWORD:
    
    message["From"] = os.environ.get("APP_GMAIL_ACCOUNT", None)
    message["To"] = dest

    sv= create_SMTP_server("smtp.gmail.com", APP_ACCOUNT, APP_PASSWORD)
    sv.sendmail(APP_ACCOUNT, dest, message.as_string())
    sv.quit()

def create_SMTP_server(host, account, password):
  SSL= os.environ.get("SMPT_SSL", False)
  
  if SSL:
    context= ssl.create_default_context()
    sv= smtplib.SMTP_SSL(host, 465, context=context) 
    sv.ehlo()
  else:
    sv= smtplib.SMTP(host, 587) 
    sv.ehlo()
    sv.starttls()
    sv.ehlo()
  
  sv.login(account, password)
  return sv

