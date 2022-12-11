from pony.orm import *
import secrets
import cryptocode
from dotenv import load_dotenv
import os

# ---------------------------------- DATABASE MODEL -------------------------------------
db = Database()


#  TODO: build recipe database entity and make the API

print('entities in working state')

load_dotenv()

#  ------------------------------------- DATABASE FUNCS -----------------------------------------
@db_session
def create_token(id):
    """  creating token """   
    created_token = secrets.token_hex(16)
    encoded_token = cryptocode.encrypt('{"user_id":"'+str(id)+'", "token":"'+created_token+'"}',os.environ.get('SECRET_KEY'))
    Users[id].token = created_token
    return encoded_token
    
@db_session
def validate_token(id,token):
    """  validating token """   
    try:
        if(Users[id].token == token):
            return True
    except:
        print('no user')
    return False
    
@db_session
def delete_token(id):
    Users[id].token = ''

@db_session
def register(user_object):
    print(user_object['firstName'])
    Users.firstName
    insert_data = Users(firstName=user_object['firstName'],lastname=user_object['lastName'],country=user_object['country'],email=user_object['email'],password=user_object['pass'])
    # commit()
    
@db_session
def retrive_user(email):
    return Users.get(email=email)

@db_session
def retrive_user_list():
    return select(p for p in Users)[:],
   



class Users(db.Entity):
    firstName = Required(str)
    lastname = Required(str)
    country = Required(str)
    email = Required(str,unique=True)
    password = Required(str)
    token = Optional(str)

class Recipes():
    recipe_name = Required(str)
    ingredients = Required(str)

