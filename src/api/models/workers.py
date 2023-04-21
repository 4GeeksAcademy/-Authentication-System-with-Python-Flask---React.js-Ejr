from api.models.db import db

class Workers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    user = db.relationship("User")
    company_id = db.Column(db.Integer, db.ForeignKey("company.id"))
    company = db.relationship("Company")
    name = db.Column(db.String(120), unique=True, nullable=False)
    working_schedule = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, name, working_schedule):
        self.name = name
        self.working_schedule = working_schedule

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "working_schedule": self.working_schedule,
            "user_id": self.user_id,
            "company_id": self.company_id,
        }