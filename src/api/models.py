
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(1024), unique=False, nullable=False)
    is_user = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(250), unique=True, nullable=False)
    number_document = db.Column(db.String(250), unique=True, nullable=False)
    phone = db.Column(db.String(250), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(250), nullable=False)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_user": self.is_user,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "number_document": self.number_document,
            "phone": self.phone,
            "age": self.age,
            "gender": self.gender
            # do not serialize the password, it's a security breach
        }

class Manager(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(1024), unique=False, nullable=False)
    is_manager = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=True)
    #Relations
    user = db.relationship('User', backref=db.backref('managers', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('managers', lazy=True))

    def __repr__(self):
        return f'<Manager {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_manager": self.is_manager,
            "user_id": self.user_id,
            "name": self.name,
            "last_name": self.last_name,
            "phone": self.phone,
            "teacher_id": self.teacher_id
            # do not serialize the password, it's a security breach
        }

class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(1024), nullable=False)
    is_teacher = db.Column(db.Boolean(), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(250), unique=True, nullable=False)
    number_document = db.Column(db.String(250), unique=True, nullable=False)
    phone = db.Column(db.String(250), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(250), nullable=False)
    certificate_teacher = db.Column(db.String(500), nullable=True)

    #relations
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user = db.relationship('User', backref=db.backref('teacher', lazy=True))

    def __repr__(self):
        return f'<Teacher {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_teacher": self.is_teacher,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "number_document": self.number_document,
            "phone": self.phone,
            "age": self.age,
            "gender": self.gender,
            "user_id": self.user_id,
            "certificate_teacher": self.certificate_teacher
            # do not serialize the password, it's a security breach
        }

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    category_title = db.Column(db.String(250), nullable=False)
    modules_length = db.Column(db.Integer, nullable=False)
    certificate = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=True)
   
    #Relations
    user = db.relationship('User', backref=db.backref('courses', lazy=True))
    manager = db.relationship('Manager', backref=db.backref('courses', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('courses', lazy=True))
    
    
    def __repr__(self):
        return f'<Course {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "manager_id": self.manager_id,
            "teacher_id": self.teacher_id,
            "category_title": self.category_title,
            "modules_length": self.modules_length,
            "certificate": self.certificate
            # do not serialize the password, it's a security breach
        }


class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=False)
    payment_id = db.Column(db.Integer, db.ForeignKey('payment.id'), nullable=False)
    title_order = db.Column(db.String(250), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(250), nullable=False)

    #Relations
    user = db.relationship('User', backref=db.backref('orders', lazy=True))
    manager = db.relationship('Manager', backref=db.backref('orders', lazy=True))
    payment = db.relationship('Payment', backref=db.backref('orders', lazy=True))

    def __repr__(self):
        return f'<Orders {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "manager_id": self.manager_id,
            "payment_id": self.payment_id,
            "title_order": self.title_order,
            "price": self.price,
            "date": self.date
            # do not serialize the password, it's a security breach
        }

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=False)
    #Relations
    user = db.relationship('User', backref=db.backref('payment', lazy=True))
    manager = db.relationship('Manager', backref=db.backref('payment', lazy=True))

    def __repr__(self):
        return f'<Payment {self.id}>'

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "manager_id": self.manager_id
        }

class Modules(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    type_file = db.Column(db.String(250), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    video_id = db.Column(db.Integer, nullable=True)
    type_video = db.Column(db.String(250), nullable=False)
    text_id= db.Column(db.Integer, nullable=True)
    type_text = db.Column(db.String(250), nullable=False)
    image_id = db.Column(db.Integer, nullable=True)
    type_image = db.Column(db.String(250), nullable=False)
    #Relations
    course = db.relationship('Course', backref=db.backref('modules', lazy=True))

    def __repr__(self):
        return f'<Modules {self.id}>'

    def serialize(self):
        return{
            "id": self.id,
            "course_id": self.course_id,
            "type_file": self.type_file,
            "title": self.title,
            "video_id": self.video_id,
            "type_video": self.type_video,
            "text_id": self.text_id,
            "type_text": self.type_text,
            "image_id": self.image_id,
            "type_image": self.type_image
        }

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    #Relations
    course = db.relationship('Course', backref=db.backref('requests', lazy=True))
    user = db.relationship('User', backref=db.backref('requests', lazy=True))

    def __repr__(self):
        return f'<Request {self.id}>'
        
    def serialize(self):
        return{
            "id": self.id,
            "course_id": self.course_id,
            "user_id": self.user_id,
        }
    
class Quizzes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_title = db.Column(db.String(250), nullable=False)
    answer = db.Column(db.String(800), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'), nullable=True)

    #Relations
    module = db.relationship('Modules', backref=db.backref('quizzes', lazy=True))

    def __repr__(self):
        return f'<Quizzes {self.id}>'
        
    def serialize(self):
        return {
            "id": self.id,
            "question_title": self.question_title,
            "answer": self.answer,
            "module_id": self.module_id,
        }