from flask import Flask,jsonify,request,Response, make_response
import json
import mysql.connector
from flask_cors import CORS
# from pony.orm import *
import db.entities as entity
from werkzeug.security import generate_password_hash, check_password_hash
import secrets


app = Flask(__name__)
# app.config['SECRET_KEY'] = ''
CORS(app=app)
   
entity.db.bind(provider='mysql',host='31.170.164.51', user='u889934763_p00nani', passwd='Pp0526767682!', db='u889934763_recipeUsers')
entity.db.generate_mapping(create_tables=True)


# user_list = entity.retrive_user_list()

@app.route('/auth', methods=['GET','POST'])
def auth():
    return jsonify({"valid":True})


@app.route('/login', methods=['GET','POST'])
def login ():
    user = request.get_json()
    
    try:
        user_data = entity.retrive_user(user['name'])
        
        if(request.method == 'POST'):
            token = entity.update_token(user_data.id)
            data = request.get_json()
            print(token)
            # Response.set_cookie(key='token', value= f'token', )
            # before_hash = 'nana'
            # hashed_pass = generate_password_hash(password=before_hash,method='pbkdf2:sha256:20000')
            # print(hashed_pass)
            # print(check_password_hash(hashed_pass,'nana'))
            # print(data['name'])
        if(data['name'] == user_data.email and data['pass'] == user_data.password):
            resp = make_response(jsonify({'data': True, "token": token}))
            resp.set_cookie(key='token', value= token)
            return resp
        else:
            return jsonify({'data':'false'})  
    except:
        
        return jsonify(['Something went wrong'])
    
    # print(user_data.email,user_data.password)
    
    
    

@app.route('/logout', methods=['GET','POST'])
def logout():
    return jsonify({'logout':'true'})
    

if __name__ == "__main__":
    
    app.run(debug=True,host='127.0.0.1',port='5001')