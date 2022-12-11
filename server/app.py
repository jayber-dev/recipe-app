from flask import Flask,jsonify,request,Response, make_response
import json
import mysql.connector
from flask_cors import CORS
# from pony.orm import *
import db.entities as entity
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import os
import cryptocode


app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
CORS(app=app)
   
entity.db.bind(provider='mysql',host='31.170.164.51', user='u889934763_p00nani', passwd='Pp0526767682!', db='u889934763_recipeUsers')
entity.db.generate_mapping(create_tables=True)


# user_list = entity.retrive_user_list()

@app.route('/auth', methods=['GET','POST'])
def auth():
    data = request.get_json()
    try:
        decrypted_token_str = cryptocode.decrypt(enc_dict=data['key'],password=os.environ.get('SECRET_KEY'))
        decrypted_token_json = json.loads(decrypted_token_str)
        is_true = entity.validate_token(id=decrypted_token_json['user_id'], token=decrypted_token_json['token'])
        return jsonify({"login":is_true})
    except:
        return jsonify({"login": False})


@app.route('/login', methods=['GET','POST'])
def login ():
    user = request.get_json()
    
    try:
        user_data = entity.retrive_user(user['name']) 
        if(request.method == 'POST'):
            
            data = request.get_json()   
            # hashed_pass = generate_password_hash(password=before_hash,method='pbkdf2:sha256:20000')
            # print(hashed_pass)
            # print(check_password_hash(hashed_pass,'nana'))
            # print(data['name'])
        if(data['name'] == user_data.email and data['pass'] == user_data.password):
            token = entity.create_token(id=user_data.id)        
            return (jsonify({'data': True, "token": token, 'id':user_data.id}))
        else:
            return jsonify({'data':'false'})  
    except:
        
        return jsonify(['Something went wrong'])
    
    
    
@app.route('/logout', methods=['GET','POST'])
def logout():
    data = request.get_json()
    decrypted_token_str = cryptocode.decrypt(enc_dict=data['key'],password=os.environ.get('SECRET_KEY'))
    decrypted_token_json = json.loads(decrypted_token_str)
    entity.delete_token(id=decrypted_token_json['user_id'])
    return jsonify({'logout':'true'})

@app.route('/register')
def register():
    return "im in register"
    

if __name__ == "__main__":
    
    app.run(debug=True,host='127.0.0.1',port='5001')