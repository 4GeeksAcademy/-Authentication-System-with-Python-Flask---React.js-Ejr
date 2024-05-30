# Importamos las librerías necesarias para la funcionalidad del script
import click  # Utilizado para crear comandos de línea de comandos en Flask
from flask import current_app as app  # Permite acceder a la instancia actual de la aplicación Flask
from api.models import db, User, Role, Permission, SecurityQuestion, Training_classes, Membership, RolePermission, Booking, UserMembershipHistory  # Importamos los modelos de la base de datos
from datetime import datetime, timedelta  # Importamos funciones de tiempo para manejar fechas
from faker import Faker  # Faker es una librería para generar datos aleatorios
import random  # Librería para generar números aleatorios

fake = Faker()  # Crea una instancia de Faker para generar datos aleatorios como nombres, correos, etc.


"""
En este archivo, puede agregar tantos comandos como desee usando el decorador @app.cli.command
Los comandos de Flask son útiles para ejecutar cronjobs o tareas fuera de la API, pero se encuentran en la integración.
con su base de datos, por ejemplo: importe el precio de bitcoin todas las noches a las 12 a.m.
"""

    
"""
Este es un comando de ejemplo "insertar-usuarios de prueba" que puede ejecutar desde la línea de comando
escribiendo: $ flask insert-test-users 5
Nota: 5 es el número de usuarios a agregar
"""
# def setup_commands(app):
#     @app.cli.command("insert-test-users") # name of our command
#     @click.argument("count") # argument of out command
#     def insert_test_users(count):
#         print("Creating test users")
#         for x in range(1, int(count) + 1):
#             user = User()
#             user.email = "test_user" + str(x) + "@test.com"
#             user.password = "123456"
#             user.is_active = True
#             db.session.add(user)
#             db.session.commit()
#             print("User: ", user.email, " created.")

#         print("All test users created")

#     @app.cli.command("insert-test-data")
#     def insert_test_data():
#         pass

# Define una función para configurar comandos de Flask
# flask create-permissions
# flask create-roles-and-permissions
# flask create-users
# flask create-memberships
# flask assign-memberships
# flask create-classes
# flask create-bookings


def setup_commands(app):
    @app.cli.command("create-permissions")
    def create_permissions():
        """Crear permisos base para la aplicación."""
        print("Creating permissions...")
        permissions = [
            {"name": "gestionar usuarios", "description": "Crear, editar, eliminar usuarios"},
            {"name": "gestionar membresias", "description": "Activar o desactivar membrecías"},
            {"name": "ver reportes", "description": "Acceso a los reportes de ingresos y egresos"},
            {"name": "configuraciones de gimnasio", "description": "Cambiar horarios de apertura, precios, etc."},
            {"name": "acceder a perfiles de miembros", "description": "Ver información detallada de todos los miembros"},
            {"name": "gestion de clases", "description": "Crear, editar, eliminar clases programadas"},
            {"name": "registro de proceso", "description": "Registrar y ver el progreso personal en ejercicios y metas"},
            {"name": "acceso a clases", "description": "Capacidad de reserva de clases grupales"}
        ]
        for perm in permissions:
            p = Permission(name=perm['name'], description=perm['description'])
            db.session.add(p)
        db.session.commit()
        print("Permissions created.")

    @app.cli.command("create-roles-and-permissions")
    def create_roles_and_permissions():
        """Crear roles y asignar permisos a estos roles."""
        print("Creating roles and permissions...")
        roles = [
            {"name": "master", "description": "Tiene acceso completo a todas las funciones y datos del sistema."},
            {"name": "admin", "description": "Gestiona todas las funciones administrativas del gimnasio."},
            {"name": "coach", "description": "Responsable de dirigir clases y entrenar a los miembros."},
            {"name": "receptionist", "description": "Maneja la recepción y la atención al cliente."},
            {"name": "athlete", "description": "Cliente regular que utiliza las instalaciones para entrenamiento."}
        ]
        for role in roles:
            r = Role(name=role['name'], description=role['description'])
            db.session.add(r)
            db.session.commit()  # Guarda el rol para obtener su ID y poder asignar permisos
        # Asignar todos los permisos a cada rol adecuadamente
        for role in Role.query.all():
            for perm in Permission.query.all():
                rp = RolePermission(role_id=role.id, permission_id=perm.id)
                db.session.add(rp)
        db.session.commit()
        print("Roles and permissions created.")

    @app.cli.command("create-users")
    def create_users():
        """Crear usuarios maestro y atletas en la base de datos."""
        print("Creating users...")
        master_user = User(
            email="usuariomaster2@gmail.com",
            name="Master2",
            last_name="Usuario",
            username="masteruser2",
            password="secure_password",
            is_active=True,
            role_id=1  # ID de rol 'master'
        )
        db.session.add(master_user)
        db.session.commit()
        for i in range(1, 6):
            user = User(
                email=f"usuario{i}@example.com",
                name=fake.first_name(),
                last_name=fake.last_name(),
                username=f"usuario{i}",
                password="secure_password",
                is_active=True,
                role_id=5  # ID de rol 'athlete'
            )
            db.session.add(user)
            db.session.commit()
            # Agrega preguntas de seguridad para cada usuario
            sq1 = SecurityQuestion(question="¿Nombre de tu primera mascota?", answer="Nala", user_id=user.id)
            sq2 = SecurityQuestion(question="¿Ciudad de nacimiento?", answer="Ciudad", user_id=user.id)
            db.session.add(sq1)
            db.session.add(sq2)
        print("Users created.")

    @app.cli.command("create-memberships")
    def create_memberships():
        """Crear diferentes tipos de membresías."""
        print("Creating memberships...")
        memberships = [
            {"name": "Gold Membership", "description": "Access to all classes and facilities.", "price": 50.00, "duration_days": 20, "classes_per_month": 10},
            {"name": "Silver Membership", "description": "Access to gym and 5 classes per month.", "price": 30.00, "duration_days": 10, "classes_per_month": 5},
            {"name": "Platinum Membership", "description": "Unlimited access to all classes and spa facilities.", "price": 70.00, "duration_days": 30, "classes_per_month": 20}
        ]
        for mem in memberships:
            membership = Membership(**mem)
            db.session.add(membership)
        db.session.commit()
        print("Memberships created.")

    @app.cli.command("assign-memberships")
    def assign_memberships():
        """Asignar membresías a los usuarios."""
        print("Assigning memberships to users...")
        membership_list = Membership.query.all()
        users = User.query.filter(User.role_id == 5).all()  # Supongamos que '5' es el ID de rol para 'atletas'
        for user in users:
            selected_membership = random.choice(membership_list)
            start_date = datetime.now()
            end_date = start_date + timedelta(days=selected_membership.duration_days)
            membership_history = UserMembershipHistory(
                user_id=user.id,
                membership_id=selected_membership.id,
                start_date=start_date,
                end_date=end_date,
                remaining_classes=selected_membership.classes_per_month,
                is_active=True
            )
            db.session.add(membership_history)
        db.session.commit()
        print("Memberships assigned to users.")

    @app.cli.command("create-classes")
    def create_classes():
        """Crear clases programadas para una semana."""
        print("Creating classes...")
        start_date = datetime.now()
        for i in range(7):
            for hour in range(8, 20, 2):  # De 8 a 18 cada dos horas
                class_info = {
                    "name": f"CrossFit Level {i}",
                    "description": "Clase de CrossFit",
                    "dateTime_class": start_date + timedelta(days=i, hours=hour - start_date.hour),
                    "start_time": f"{hour}:00",
                    "duration_minutes": 60,
                    "available_slots": 20
                }
                training_class = Training_classes(**class_info)
                db.session.add(training_class)
        db.session.commit()
        print("Classes created.")

    @app.cli.command("create-bookings")
    def create_bookings():
        """Crear reservas para las clases creadas."""
        print("Creating bookings...")
        users = User.query.filter(User.role_id == 5).all()  # Todos los usuarios atletas
        classes = Training_classes.query.all()
        for training_class in classes:
            num_bookings = random.randint(1, min(training_class.available_slots, 15))  # Reservas aleatorias
            booked_users = random.sample(users, num_bookings)  # Usuarios aleatorios para reservas
            for user in booked_users:
                booking = Booking(
                    user_id=user.id,
                    training_class_id=training_class.id,
                    booking_date=datetime.now(),
                    status='reserved'
                )
                db.session.add(booking)
        db.session.commit()
        print("Bookings created.")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        """Insertar todos los datos de prueba en la base de datos de manera secuencial y ordenada."""
        create_permissions()
        create_roles_and_permissions()
        create_users()
        create_memberships()
        assign_memberships()
        create_classes()
        create_bookings()
        print("All test data created successfully!")
