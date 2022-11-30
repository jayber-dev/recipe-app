from flask import Flask,jsonify,request
import json
import mysql.connector
from flask_cors import CORS
# from pony.orm import *
import db.entities as entity
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
CORS(app=app)
   
entity.db.bind(provider='mysql',host='31.170.164.51', user='u889934763_p00nani', passwd='Pp0526767682!', db='u889934763_recipeUsers')
entity.db.generate_mapping(create_tables=True)

# entity.insert('jayber1@gmail.com','Pp304682685!')
user_list = entity.retrive_user_list()
for i in user_list:
    print(i.email, i.password)
# print(user_list[0].email)

@app.route('/login', methods=['GET','POST'])
def login ():
    user = request.get_json()
    try:
        user_data = entity.retrive_user(user['name'])
        if(request.method == 'POST'):
            data = request.get_json()
            before_hash = 'nana'
            hashed_pass = generate_password_hash(password=before_hash,method='pbkdf2:sha256:20000')
            print(hashed_pass)
            print(check_password_hash(hashed_pass,'nana'))
            print(data['name'])
        if(data['name'] == user_data.email):
            return jsonify({'data':check_password_hash(hashed_pass,'nana'),'hashed_pass':hashed_pass})
        else:
            return jsonify({'data':'false'})  
    except:
        pass
    
    # print(user_data.email,user_data.password)
    
    return jsonify([{'nana':'lala'},2,3])
    

@app.route('/logout', methods=['GET','POST'])
def logout():
    return jsonify({'logout':'true'})
    

if __name__ == "__main__":
    
    app.run(debug=True,host='127.0.0.1',port='5001')