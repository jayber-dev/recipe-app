from pony.orm import *
import secrets

#  TODO: build recipe database entity and make the API

print('entities in working state')
db = Database()


@db_session
def create_token(id):
    """  creating token """   
    created_token = secrets.token_hex(16)
    Users[id].token = created_token
    return created_token
    
@db_session
def validate_token(id,token):
    """  validating token """   
    if(Users[id].token == token):
        return True
    return False
    
@db_session
def delete_token(id):
    print(id)
    Users[id].token = ''

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

    

