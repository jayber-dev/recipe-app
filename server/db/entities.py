from pony.orm import *
import secrets

#  TODO: build recipe database entity and make the API

print('entities in working state')
db = Database()


@db_session
def update_token(id):
    """  varifying existing token and replacing if needed"""
    data = Users[id]
    print(secrets.token_hex(16))
    data.token = f'{secrets.token_hex(16)}'
    return

@db_session
def insert(email,password):
    insert_data = Users(email=email,password=password)
    # commit()
    
@db_session
def retrive_user(email):
    return Users.get(email=email)

@db_session
def retrive_user_list():
    return select(p for p in Users)[:],
   


class Users(db.Entity):
    email = Required(str,unique=True)
    password = Required(str)
    token = Optional(str)

class Recipes():
    recipe_name = Required(str)
    ingredients = Required(str)

    

