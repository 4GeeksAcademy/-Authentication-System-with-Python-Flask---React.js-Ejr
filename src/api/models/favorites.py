from api.models.db import db

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User", back_populates="favs") 
    id_lawyer = db.Column(db.Integer, db.ForeignKey("lawyer.id"))
    lawyer = db.relationship("Lawyer", back_populates="favs") 
    id_company = db.Column(db.Integer, db.ForeignKey("company.id"))
    company = db.relationship("Company", back_populates="favs") 
