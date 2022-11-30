from pony.orm import *


print('hello from entities')
db = Database()

@db_session
def insert():
    pass


class Person(db.Entity):
    user = Required(str, unique=True)
    passeord = Required(int)
    
class User(db.Entity):
    email = Required(str,unique=True)
    password = Required(str)
    

