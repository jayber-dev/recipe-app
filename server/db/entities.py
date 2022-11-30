from pony.orm import *


print('hello from entities')
db = Database()

@db_session
def insert(email,password):
    insert_data = Users(email=email,password=password)
    # commit()
    
@db_session
def retrive_user(email):
    return Users.get(email=email)

@db_session
def retrive_user_list():
    return select(p for p in Users)[:]


class Users(db.Entity):
    email = Required(str,unique=True)
    password = Required(str)
    token = Optional(str)
    

