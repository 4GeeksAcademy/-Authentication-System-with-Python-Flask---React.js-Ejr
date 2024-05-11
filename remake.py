from os import system
if __name__ == '__main__':
    system("flask wipe-db")
    system("rm -rf migrations")
    system("flask db init")
    system("flask db upgrade")
    system("flask db migrate")
    system("flask db upgrade")