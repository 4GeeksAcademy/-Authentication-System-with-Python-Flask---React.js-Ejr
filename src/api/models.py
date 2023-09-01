from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Tracker(db.Model):
    __tablename__ = 'trackers'
    id = db.Column(db.Integer, primary_key=True)
    scholarship = db.relationship("Scholarship", back_populates="trackers" )
    scholarship_id = db.Column(db.Integer, db.ForeignKey("scholarships.id"))
    follows = db.Column(db.Integer, unique=False, nullable=False)
    scholarship_name = db.Column(db.String(120), unique=True, nullable=False)
    dates = db.Column(db.String(120), unique=False, nullable=False)
    institution = db.Column(db.String(120), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<Tracker {self.id}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            "id": self.id,
            "follows": self.follows,
            "scholarship_name": self.scholarship_name,
            "dates": self.dates,
            "institution": self.institution
        }
    


class Scholarship(db.Model):
    __tablename__ = 'scholarships'
    id = db.Column(db.Integer, primary_key=True)
    trackers = db.relationship("Tracker", back_populates="scholarship" )
    scholarship_name = db.Column(db.String(120), unique=True, nullable=False)
    dates = db.Column(db.String(150), unique=False, nullable=False)
    institution = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<Scholarship {self.id}>'
    
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
            "dates": self.dates,
            "institution": self.institution
        }    

class User(db.Model):
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
    
