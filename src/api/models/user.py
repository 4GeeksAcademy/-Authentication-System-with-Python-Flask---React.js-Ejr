from api.extensions import db

class User(db.Model):
    """
    User model representing user data in the database.
    """
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        """
        Returns a string representation of the User object.
        """
        return f'<User {self.email}>'

    def serialize(self):
        """
        Serialize the User object into a dictionary for JSON representation.

        :return: A dictionary containing user data (excluding the password).
        """
        return {
            "id": self.id,
            "email": self.email,
            # Do not serialize the password, as it's a security breach.
        }
