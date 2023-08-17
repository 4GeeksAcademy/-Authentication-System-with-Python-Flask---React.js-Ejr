# from marshmallow import Schema, fields as ma
# from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
# from .models import Actor

# class ActorSchema(SQLAlchemyAutoSchema):
#     class Meta:
#         model = Actor
#         load_instance = True

#     birthday = ma.Date(format='%Y-%m-%d')
#     deathday = ma.Date(format='%Y-%m-%d', default=None)