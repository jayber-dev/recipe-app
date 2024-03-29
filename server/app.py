from flask import Flask, jsonify, request, Response, make_response, url_for, send_from_directory
import json
import mysql.connector
from flask_cors import CORS
from pony.orm import *
import db.entities as entity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import secrets
import os
import cryptocode
from ast import literal_eval

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
PORT = '5000'
DOMAIN = 'http://127.0.0.1' 

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['UPLOAD_FOLDER'] = os.environ.get('UPLOAD_FOLDER')
app.config['PROFILE_UPLOAD_FOLDER'] = os.environ.get('PROFILE_UPLOAD_FOLDER')
CORS(app=app)

# entity.db.bind(provider='mysql', host='31.170.164.51', user='u889934763_p00nani',
#                passwd='Pp0526767682!', db='u889934763_recipeUsers')

entity.db.bind(provider="sqlite", filename='db.sqlite', create_db=True)
entity.db.generate_mapping(create_tables=True)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# user_list = entity.retrive_user_list()


@app.route('/auth', methods=['GET', 'POST'])
def auth():
    print("im in auth")
    data = request.get_json()
    try:
        decrypted_token_str = cryptocode.decrypt(
            enc_dict=data['key'], password=os.environ.get('SECRET_KEY'))
        decrypted_token_json = json.loads(decrypted_token_str)
        is_true = entity.validate_token(
            id=decrypted_token_json['user_id'], token=decrypted_token_json['token'])
        user_data = entity.retrive_user_by_id(decrypted_token_json['user_id'])
        return jsonify({
                        "login": is_true,
                        "firstName":user_data.firstName,
                        "lastName": user_data.lastName,
                        "imgName": f"{DOMAIN}:{PORT}/profile/{user_data.imgName}",
                        })
    except:
        return jsonify({"login": False})


@app.route('/register', methods=['GET', 'POST'])
def register():
    print('im in register')
    data = request.get_json()
    user_object = json.loads(data['data'])
    entity.register(user_object)
    print('user registered')
    return jsonify({"wow": "nana"})


@app.route('/login', methods=['GET', 'POST'])
def login():
    user = request.get_json()
    try:
        user_data = entity.retrive_user(user['name'])
        if (request.method == 'POST'):
            data = request.get_json()
            # hashed_pass = generate_password_hash(password=before_hash,method='pbkdf2:sha256:20000')
            # print(hashed_pass)
            # print(check_password_hash(hashed_pass,'nana'))
            # print(data['name'])
        if (data['name'] == user_data.email and data['pass'] == user_data.password):
            token = entity.create_token(id=user_data.id)
            
            return (jsonify({
                'data': True,
                "token": token,
                'id': user_data.id,
                'firstName': user_data.firstName,
                'lastName': user_data.lastName,
                'imgName': f"{DOMAIN}:{PORT}/profile/{user_data.imgName}"}))
        else:
            return jsonify({'data': 'false', 'message': 'Wrong password'})
    except:

        return jsonify({'data': 'false', 'message': 'User\'s email does not exist'})


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    data = request.get_json()
    decrypted_token_str = cryptocode.decrypt(
        enc_dict=data['key'], password=os.environ.get('SECRET_KEY'))
    decrypted_token_json = json.loads(decrypted_token_str)
    entity.delete_token(id=decrypted_token_json['user_id'])
    return jsonify({'logout': 'true'})

# SECTION --------------------------------------------- Recipes Handler ------------------------------------


@app.route('/addRecipe', methods=['GET', 'POST'])
def add_recipe():
    print('got the messege')
    if request.method == 'POST':
        data = request.get_json()
        decrypted_token_str = cryptocode.decrypt(
            enc_dict=data['key'], password=os.environ.get('SECRET_KEY'))
        decrypted_token_json = json.loads(decrypted_token_str)
        entity.add_recipe(id=decrypted_token_json['user_id'], data=data)
        return jsonify({'return': 'got the messege'})


@app.route('/retriveRecipes')
def retrive_recipes():
    print(request.args.get('startIndex'))
    print(request.args.get('endIndex'))
    data = entity.retrive_recipes(int(request.args.get('startIndex')),int(request.args.get('endIndex')))
    if(data):
        return data
    else:
        return jsonify({'data': False})

@app.route('/retriveRecipe/<string:id>')
def retrive_recipe(id):
    print('im in retrive ' + id)
    data = entity.retrive_recipe(id)
    # return_obj
    return jsonify(data)

@app.route('/retriveUserRecipes/')
def retrive_user_recipes():
    key =  request.args.get('key')
    decrypted_str = cryptocode.decrypt(key, os.environ.get('SECRET_KEY'))
    decrypted_json = json.loads(decrypted_str)
    data = entity.retrive_user_recipes(decrypted_json['user_id'])
    return jsonify(data)

@app.route('/updateRecipe', methods=['GET','POST','PATCH'])
def update_recipe():
    
    json_data = request.get_json()
    
    data = entity.update_recipe(id=json_data['id'],data=json_data['data'])
    return jsonify({"data": "dataUpdated"})

@app.route('/deleteRecipe', methods=['POST','GET','DELETE'])
def delete_recipe():
    entity.delete_recipe(request.args['data'])
    return jsonify({"data": "recived"})

# SECTION ---------------------------------------- FILES UPLOAD AND SERVE HANDLER ----------------------------


@app.route('/upload-img', methods=['GET', 'POST'])
def file_upload():
    print('im inside file upload')
    if 'file' not in request.files:
    # TODO: add key decoder to query user data and put email in filename 
        return jsonify({'data': 'no file was given'})
    file = request.files['file']
    if file and allowed_file(file.filename):
        print(file.filename)
        file_name = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name))
        return jsonify({'data': 'file uploaded'})
    return jsonify({'data': 'no file provided'})


@app.route('/upload-profile', methods=['GET', 'POST'])
def upload_profile_img():
    print('im inside file upload')
    if 'file' not in request.files:
        print('im in not in file')
        return jsonify({'data': 'no file was given'})
    file = request.files['file']
    if file and allowed_file(file.filename):
        file_name = secure_filename(file.filename)
        file.save(os.path.join(app.config['PROFILE_UPLOAD_FOLDER'], file_name))
        return jsonify({'data': 'file uploaded'})
    return jsonify({'data': 'no file provided'})


@app.route('/recipe-images/<string:imgName>')
def img(imgName):
    return send_from_directory(app.config['UPLOAD_FOLDER'], imgName)


@app.route('/profile/<string:imgName>')
def profile_img_serve(imgName):
    return send_from_directory(app.config['PROFILE_UPLOAD_FOLDER'], imgName)

# SECTION ------------------------------ LIKES HANDLING ------------------------------------------

# TODO: addLikes route

@app.route('/addLike', methods=['POST','GET'])
def add_like():
    data = (request.get_json())
    print(data.get('recipe_id'))
    print(data.get('key'))
    key =  data.get('key')
    decrypted_str = cryptocode.decrypt(key, os.environ.get('SECRET_KEY'))
    decrypted_json = json.loads(decrypted_str)
    
    entity_response = entity.add_like(recipeId=data.get('recipe_id'),user_id=decrypted_json['user_id'])
    return jsonify({'data': entity_response})

@app.route('/checkLike', methods=['GET', 'POST'])
def check_like():
    print('im in check if liked')
    data = request.args
    key =  data.get('key')
    decrypted_str = cryptocode.decrypt(key, os.environ.get('SECRET_KEY'))
    decrypted_json = json.loads(decrypted_str)
    entity_response = entity.check_like(data.get('recipeId'), decrypted_json['user_id'])
    print(entity_response)
    return jsonify({'data':entity_response})
    
if __name__ == "__main__":
    website_url = '127.0.0.1:5000'
    app.config['SERVER_NAME'] = website_url
    app.run(debug=True, )
