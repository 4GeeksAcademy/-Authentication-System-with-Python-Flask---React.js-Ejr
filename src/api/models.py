from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    password = db.Column(db.String(80), unique=False, nullable=True)
    is_user = db.Column(db.Boolean(), unique=False, nullable=True)
    name = db.Column(db.String(250), nullable=True)
    last_name = db.Column(db.String(250), nullable=True)
    username = db.Column(db.String(250), nullable=False)
    numero_de_documento = db.Column(db.Integer, nullable=True)
    phone = db.Column(db.Integer, nullable=False)
    age = db.Column(db.String(250), nullable=True)
    gender = db.Column(db.String(250), nullable=True)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_user": self.user,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "numero_de_documento": self.numero_de_documento,
            "phone": self.phone,
            "age": self.age,
            "gender": self.gender
            # do not serialize the password, its a security breach
        }

class Manager(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    password = db.Column(db.String(80), unique=False, nullable=True)
    is_manager = db.Column(db.Boolean(), unique=False, nullable=True)
    name = db.Column(db.String(250), nullable=True)
    last_name = db.Column(db.String(250), nullable=True)
    phone = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'))
    #Relations
    user = db.relationship('User', backref=db.backref('manager', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('manager', lazy=True))

    def __repr__(self):
        return f'<Manager {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_manager": self.is_manager,
            "user_id": self.user_id,
            "name": self.name,
            "username": self.username,
            "phone": self.phone,
            "user_id": self.user_id,
            "teacher_id": self.teacher_id
            # do not serialize the password, its a security breach
        }

class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    password = db.Column(db.String(80), unique=False, nullable=True)
    is_teacher = db.Column(db.Boolean(), unique=False, nullable=True)
    name = db.Column(db.String(250), nullable=True)
    last_name = db.Column(db.String(250), nullable=True)
    username = db.Column(db.String(250), nullable=False)
    numero_de_documento = db.Column(db.Integer, nullable=True)
    phone = db.Column(db.Integer, nullable=False)
    age = db.Column(db.String(250), nullable=False)
    gender = db.Column(db.String(250), nullable=False)
    #relations
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user = db.relationship('User', backref=db.backref('teacher', lazy=True))

    def __repr__(self):
        return f'<Teacher {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_teacher": self.teacher,
            "manager_id": self.manager_id,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "numero_de_documento": self.numero_de_documento,
            "phone": self.phone,
            "age": self.age,
            "gender": self.gender,
            "user_id": self.user_id
            # do not serialize the password, its a security breach
        }

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=True)
    title = db.Column(db.String(250), nullable=True)
    category_title = db.Column(db.String(250), nullable=True)
    modules_lenght = db.Column(db.Integer, nullable=True)
    certificado = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)
    #Relations
    user = db.relationship('User', backref=db.backref('course', lazy=True))
    manager = db.relationship('Manager', backref=db.backref('course', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('course', lazy=True))
    category = db.relationship('Category', backref=db.backref('course', lazy=True))
    
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
            "category_id": self.category_id,
            "modules_lenght": self.modules_lenght,
            "certificado": self.certificado
            # do not serialize the password, its a security breach
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=True)
    title_category = db.Column(db.String(250), nullable=True)
    title_course = db.Column(db.String(250), nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=False)
    #Relations
    manager = db.relationship('Manager', backref=db.backref('category', lazy=True))
    teacher = db.relationship('Teacher', backref=db.backref('category', lazy=True))

    def __repr__(self):
        return f'<Category {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "manager_id": self.manager_id,
            "teacher_id": self.teacher_id,
            "title_category": self.title_category,
            "title_course": self.title_course
            # do not serialize the password, its a security breach
        }

class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=True)
    payment_id = db.Column(db.Integer, db.ForeignKey('payment.id'), nullable=True)
    title_order = db.Column(db.String(250), nullable=True)
    price = db.Column(db.Integer, nullable=True)
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
            "price": self.price
            # do not serialize the password, its a security breach
        }

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id'), nullable=True)
    #Relations
    user = db.relationship('User', backref=db.backref('payment', lazy=True))
    manager = db.relationship('Manager', backref=db.backref('payment', lazy=True))

    def __repr__(self):
        return f'Payment {self.id}'

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "manager_id": self.manager_id
        }

class Modules(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=True)
    type_file = db.Column(db.String(250), nullable=True)
    title = db.Column(db.String(250), nullable=True)
    video_id = db.Column(db.Integer, nullable=True)
    type_video = db.Column(db.String(250), nullable=False)
    text_id= db.Column(db.Integer, nullable=True)
    type_text = db.Column(db.String(250), nullable=False)
    image_id = db.Column(db.Integer, nullable=True)
    type_image = db.Column(db.String(250), nullable=False)
    #Relations
    course = db.relationship('Course', backref=db.backref('modules'), lazy=True)

    def __repr__(self):
        return f'Modules {self.id}'

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
    id = db.Column(db.Integer, primary_key=True, nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    #Relations
    course = db.relationship('Course', backref=db.backref('request'), lazy=True)
    user = db.relationship('User', backref=db.backref('request'), lazy=True)

    def __repr__(self):
        return f'Request {self.id}'
        
    def serialize(self):
        return{
            "id": self.id,
            "course_id": self.course_id,
            "user_id": self.user_id,
        }