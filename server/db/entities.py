from pony.orm import *
import secrets
import cryptocode
from dotenv import load_dotenv
import os



db = Database()

load_dotenv()

# SECTION ----------------------------------------- DATABASE MODEL ---------------------------------------------

class Users(db.Entity):
    firstName = Required(str)
    lastName = Required(str)
    country = Optional(str)
    email = Required(str, unique=True)
    password = Required(str)
    token = Optional(str)
    imgName = Optional(str)
    recipes = Set('Recipes')


class Recipes(db.Entity):
    user = Required(Users)
    recipe_name = Required(str)
    cooking_time = Required(int)
    preperation_time = Required(int)
    primary_image = Required(str)
    ingredients = Required(LongStr)
    cooking_steps = Required(LongStr)
    
class Likes(db.Entity):
    userId = Required(int)
    recipeId = Required(int)
    


# SECTION -------------------------------------USER DATABASE FUNCTIONS -----------------------------------------


@db_session
def create_token(id):
    """  creating token """
    created_token = secrets.token_hex(16)
    encoded_token = cryptocode.encrypt(
        '{"user_id":"'+str(id)+'", "token":"'+created_token+'"}', os.environ.get('SECRET_KEY'))
    Users[id].token = created_token
    return encoded_token


@db_session
def validate_token(id, token):
    """  validating token """
    try:
        if (Users[id].token == token):
            return True
    except:
        print('no user')
    return False


@db_session
def delete_token(id):
    Users[id].token = ''


@db_session
def register(user_object):
    # print(user_object)
    Users.firstName
    insert_data = Users(firstName=user_object['firstName'], lastName=user_object['lastName'],
                        country=user_object['country'], email=user_object['email'], password=user_object['password'],imgName=user_object['imgName'])
    # commit()


@db_session
def retrive_user(email):
    return Users.get(email=email)

@db_session
def retrive_user_by_id(id):
    return Users.get(id=id)

@db_session
def retrive_user_list():
    return select(p for p in Users)[:],

# SECTION --------------------------------- RECIPES DATABASE FUNCTIONS ----------------------------------------


@db_session
def retrive_recipes(from_index,to_index):
    # set_sql_debug(True)
    # print(os.environ['UPLOAD_FOLDER'])
   
    obj_array = []
    recipe_length = list(Recipes.select())
    recipe_obj = Recipes.select().order_by(Recipes.recipe_name)[from_index:to_index]
    curr_obj_length = 0
    for i in recipe_obj: 
        curr_obj_length += 1
        obj_array.append({
            'userId': i.user.id,
            'userFirstName': i.user.firstName,
            'userlastName': i.user.lastName,
            'recipeId': i.id,
            'title': i.recipe_name,
            'cookingTime': i.cooking_time,
            'preperationTime':i.preperation_time,
            'recipe-img': f"http://127.0.0.1:5001/recipe-images/{i.primary_image}",
            'profile-img': f"http://127.0.0.1:5001/profile/{i.user.imgName}",
            # 'ingredients': i.ingredients,
            # 'cookingSteps': i.cooking_steps,
            'max-length':len(recipe_length),
        })
    try:
        obj_array[0]['currLength'] = curr_obj_length
    except:
        pass

    return obj_array



@db_session
def retrive_recipe(id):
    obj_array = {}
    data = Recipes.get(id=id)
    steps = data.cooking_steps.replace("'",'"')
    ingredients = data.ingredients.replace("'",'"')
    obj_array = {
            "userId": data.user.id,
            "userFirstName": data.user.firstName,
            "userlastName": data.user.lastName,
            "recipeId": data.id,
            "title": data.recipe_name,
            "cookingTime": data.cooking_time,
            'preperationTime':data.preperation_time,
            "recipe-img": f"http://127.0.0.1:5001/recipe-images/{data.primary_image}",
            "profile-img": f"http://127.0.0.1:5001/profile/{data.user.imgName}",
            "ingredients": ingredients,
            "cookingSteps": steps,
        }
    
    return obj_array

@db_session
def retrive_user_recipes(id):
    print(id)
    obj_array = []
    recipe_obj = Recipes.select(user=id)
    for i in recipe_obj:
        steps = i.cooking_steps.replace("'",'"')
        ingredients = i.ingredients.replace("'",'"')
        print(steps)
        print(ingredients)
        obj_array.append({
            'userId': i.user.id,
            'userFirstName': i.user.firstName,
            'userlastName': i.user.lastName,
            'recipeId': i.id,
            'title': i.recipe_name,
            'cookingTime': i.cooking_time,
            'preperationTime':i.preperation_time,
            'recipe-img': f"http://127.0.0.1:5001/recipe-images/{i.primary_image}",
            'profile-img': f"http://127.0.0.1:5001/profile/{i.user.imgName}",
            'ingredients': ingredients,
            'cookingSteps': steps,
        })
    
    return (obj_array)
    
    

@db_session
def add_recipe(id, data):
    # set_sql_debug(True)

    # print(data)
    # print(data['data']['title'])
    # print(data['data']['img'])
    recipe = Recipes(recipe_name=data['data']['title'],
                     cooking_time=data['data']['cookingTime'],
                     primary_image=data['data']['img'],
                     ingredients=str(data['data']['ingredients']),
                     cooking_steps=str(data['data']['cookingSteps']),
                     user=Users[id],
                     preperation_time=data['data']['preperationTime']
                     )
    return

@db_session
def update_recipe(id, data):
    # print((str(data['steps'])))
    
    recipe_data = Recipes.get(id=id)
    recipe_data.recipe_name = data['title']
    recipe_data.preperation_time = data['preperationTime']
    recipe_data.cooking_time = data['cookingTime']
    recipe_data.ingredients = str(data['ingredient'])
    if(data['primaryImage']):
        recipe_data.primary_image = data['primaryImage'] 
    recipe_data.cooking_steps = str(data['steps'])
    # print(recipe_data)
    return True

@db_session
def delete_recipe(recipe_id):
    set_sql_debug(True)

    data = Recipes.get(id=recipe_id)
    data.delete()
    print(id)
    