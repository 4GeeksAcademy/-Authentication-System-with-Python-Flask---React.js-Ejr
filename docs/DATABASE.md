# Database configuration

In this boilerplate, you can use either postgres or sqlite as database engine. Verify your .env file to specify which one you would like to use.
You can use the env var `DATABASE_URL` for this purpose.

# Creating and/or Accessing the Postgres Database

1. Log in to postgres terminal:
```sh
$ psql
```
2. Once inside, list all the databases and check if you have the database already created:
```sql
\l
```
Note: If you are using GitPod, check the file `docs/assets/reset_migrations.bash`. Basically, you are creating a database from scratch call `example`.

3. If you don't see the example database create it by typing:
```sql
CREATE DATABASE example;
```
Note: Make sure to update the `DB_CONNECTION_STRING` on the `.env` file with the correct database name.

3. If your database is already created, get inside of it by typing:

*Command*
```sql
\c example;
```
pipenv run reset_db

*Result*
```sql
postgres=# \c example;
You are now connected to database "example" as user "gitpod".
```
4. Now you could want to see all the tables availables:
```sql
\dt
```

5. Also you can execute, all the SQL queries you want. For example, assuming you have a `users` table:
```
select * from users;
```

Note: Type `exit` if you want to exit from the postgres terminal.

More commands, you can check this [amazing summary](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

# Querying data using Python and SQL Alchemy (SELECT)

Assuming you have a Person object in your models.py file.

```py
# get all the people
people_query = Person.query.all()

# get only the ones named "Joe"
people_query = Person.query.filter_by(name='Joe')

# map the results and your list of people  inside of the all_people variable
all_people = list(map(lambda x: x.serialize(), people_query))

# get just one person
user1 = Person.query.get(person_id)
 ```

## Inserting data

Assuming you have a Person object in your models.py file.

```py
user1 = Person(username="my_super_username", email="my_super@email.com")
db.session.add(user1)
db.session.commit()
```

### Updating data

```py
user1 = Person.query.get(person_id)
if user1 is None:
    raise APIException('User not found', status_code=404)

if "username" in body:
    user1.username = body["username"]
if "email" in body:
    user1.email = body["email"]
db.session.commit()
```
 
 ### Delete data
 
 ```py
 user1 = Person.query.get(person_id)
if user1 is None:
    raise APIException('User not found', status_code=404)
db.session.delete(user1)
db.session.commit()
 ```

## ONE to MANY relationship
A one to many relationship places a foreign key on the child table referencing the parent. 
Relationship() is then specified on the parent, as referencing a collection of items represented by the child:

```py
class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    children = db.relationship('Child', backref='parent',lazy=True)

    def __repr__(self):
        return f'<Parent {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "children": list(map(lambda x: x.serialize(), self.children))
        }

class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("parent.id"), nullable=False)
    
    def __repr__(self):
        return '<Child {self.name}>
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
```

## MANY to MANY relationship
Many to Many adds an association table between two classes. The association table is indicated by the secondary argument to relationship(). Usually, the Table uses the MetaData object associated with the declarative base class, so that the ForeignKey directives can locate the remote tables with which to link:

```py
association_table = db.Table('association',
    db.Column("sister_id", db.Integer, ForeignKey("sister.id"), primary_key=True),
    db.Column("brother_id", db.Integer, ForeignKey("brother.id"), primary_key=True)
)

class Sister(db.Model):
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(80), nullable=False)
    brothers = db.relationship("Brother",
                    secondary=association_table
                    back_populates="sisters") # this line is so it updates the field when Sister is updated
                    
    def __ref__(self):
        return f'<Sister {self.name}>'
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "brothers": list(map(lambda x: x.serialize(), self.brothers))
        }

class Brother(db.Model):
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(80), nullable=False)
    sisters = db.relationship("Sister",
                    secondary=association_table
                    back_populates="brothers")
                    
    def __ref__(self):
        return f'<Brother {self.name}>'
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "sisters": list(map(lambda x: x.serialize(), self.sisters))
        }
```

# OFFICAL DOCUMENTATION FOR MODELS FLASK Alchemy

Please visit the following page for more information: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/