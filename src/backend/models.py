import time
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# this is the User from my auth project, slightly modified xd
class User(db.Model):
  __tablename__="users"
  id = db.Column(db.Integer, nullable=False, primary_key=True)
  username = db.Column(db.String(24), nullable=False, unique=True)
  displayname = db.Column(db.String(32), nullable=False)
  email = db.Column(db.String(32), nullable=False, unique=True)
  avatarurl = db.Column(db.String(256))
  password = db.Column(db.LargeBinary, nullable=False) # password is stored hashed, in binary
  permission= db.Column(db.Integer, nullable=False, default=0) # 0 user 1 admin
  timestamp = db.Column(db.Integer, nullable=False, default=0)

  def __repr__(self):
    return f'<User {self.email}::{self.username} ({self.displayname})>'

  def serialize(self):
    return {
      "id": self.id,
      "username": self.username,
      "displayname": self.displayname,
      "email": self.email,
      "avatarurl": self.avatarurl,
      # these are just for testing
      "permission": self.permission,
      "timestamp": time.ctime(self.timestamp) if self.timestamp > 0 else 0,
      "password": str(self.password)
    }