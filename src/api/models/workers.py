from api.models.db import db

class Workers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    company_id = db.Column(db.Integer, db.ForeignKey("company.id"))
    name = db.Column(db.String(120), unique=True, nullable=False)
    working_schedule = db.Column(db.String(120), unique=True, nullable=False)
    user = db.relationship("User")
    company = db.relationship("Company")

    def __init__(self, user_id, company_id, name, working_schedule):
        self.user_id = user_id
        self.company_id = company_id
        self.name = name
        self.working_schedule = working_schedule

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "company_id": self.company_id,
            "name": self.name,
            "working_schedule": self.working_schedule,
        }
    