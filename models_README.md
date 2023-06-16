# Database Tables

This README provides an overview of the different tables present in the database and their relationships. The database is designed using SQLAlchemy and consists of the following tables:

## User

The User table represents users of the application. It stores information such as the user's email, name, lastname, password, admin status, renter status, date of birth, and their unique identifier (id). The table has a one-to-many relationship with the Rentas table, allowing a user to have multiple rentas associated with them.


## Canchas

The Canchas table represents different sports fields or venues available for rent. It contains information about the location, name, unique identifier (id), and the user who owns the cancha. It also has a many-to-many relationship with the Rentas table, allowing multiple rentas to be associated with a cancha.

## Rentas

The Rentas table represents rental instances for a cancha. It stores information such as availability, unique identifier (id), and a counter indicating the availability status. The table has a one-to-many relationship with the User table, as each renta is associated with a single user. It also has a many-to-many relationship with the Canchas table, allowing a renta to be associated with multiple canchas.

## Sport

The Sport table represents different sports types or categories. It contains information about the sport's unique identifier (id) and its type. The Canchas table has a foreign key relationship with the Sport table, allowing a cancha to be associated with a specific sport.

### Relationship Tables

The database also includes two relationship tables:

- rentas_user: This table establishes a many-to-many relationship between the User and Rentas tables, allowing multiple users to be associated with multiple rentas.
- canchas_rentas: This table establishes a many-to-many relationship between the Canchas and Rentas tables, allowing multiple canchas to be associated with multiple rentas.

These relationship tables facilitate the connections between the different entities in the database.

### Serialization

Each table has a serialize() method defined, which allows easy conversion of the objects to JSON or dictionaries. This serialization can be useful when working with data from the database.

This README provides a high-level overview of the tables and relationships in the database. For more detailed information, please refer to the corresponding Python code files.
