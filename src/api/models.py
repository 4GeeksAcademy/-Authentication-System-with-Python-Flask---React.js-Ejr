from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Tracker(db.Model):
    __tablename__ = 'trackers'
    id = db.Column(db.Integer, primary_key=True)
    tracker_name = db.Column(db.String(50), unique=False, nullable=True)
    scholarship_name = db.Column(db.String(50), unique=False, nullable=True)
    scholarship = db.relationship("Scholarship", back_populates="trackers")
    email = db.Column(db.String(50), unique=False, nullable=True)
    user_email = db.relationship("User", back_populates="tracker")

    

    def __repr__(self):
        return f'{self.tracker_name}'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            "id": self.id,
            "tracker_name": self.tracker_name
        }
    


class Scholarship(db.Model):
    __tablename__ = 'scholarships'
    id = db.Column(db.Integer, primary_key=True)
    trackers = db.relationship("Tracker", back_populates="scholarship")
    trackers_id = db.Column(db.Integer, db.ForeignKey("trackers.id"))
    scholarship_name = db.Column(db.String(120), unique=True, nullable=False)
    institution = db.Column(db.String(120), unique=False, nullable=False)
    deadline = db.Column(db.String(50), unique=False, nullable=False)
    modality = db.Column(db.String(50), unique=False, nullable=False)
    coverage = db.Column(db.String(50), unique=False, nullable=False)
    description = db.Column(db.String(800), unique=False, nullable=False)
    url_to = db.Column(db.String(250), unique=False, nullable=False)
    

    def __repr__(self):
        return f'{self.scholarship_name}'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            "id": self.id,
            "scholarship_name": self.scholarship_name,
            "institution": self.institution,
            "deadline": self.deadline,
            "modality": self.modality,
            "coverage": self.coverage,
            "description": self.description,
            "url_to": self.url_to,
        }    

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    tracker_id = db.Column(db.Integer, db.ForeignKey("trackers.id"))
    tracker = db.relationship(Tracker)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return f'<User {self.email}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "tracker_id" : self.tracker_id,
            # do not serialize the password, its a security breach
        }
    
class InstitutionalUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    institutional_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<InstitutionalUser {self.email}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()


    def serialize(self):
        return {
            "id": self.id,
            "institutional_name": self.institutional_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
