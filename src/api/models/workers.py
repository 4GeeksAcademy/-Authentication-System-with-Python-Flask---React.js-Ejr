from api.models.db import db


class Workers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    company_id = db.Column(db.Integer, db.ForeignKey("company.id"))
    working_schedule = db.Column(db.String(60), nullable=False)
    user = db.relationship("User")
    company = db.relationship("Company")

    def __init__(self, user_id, company_id, working_schedule):
        self.user_id = user_id
        self.company_id = company_id
        self.working_schedule = working_schedule

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "company_id": self.company_id,
            "working_schedule": self.working_schedule,
            "user": self.user.serialize(),
        }
