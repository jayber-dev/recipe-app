from flask import Flask,jsonify,request
import json
import mysql.connector
from flask_cors import CORS
# from pony.orm import *
import db.entities as entity


app = Flask(__name__)
CORS(app=app)

# mydb = mysql.connector.connect(
#     host='31.170.164.51',
#     user='u889934763_p00nani',
#     password='Pp0526767682!',
#     database='u889934763_recipeUsers',  
# )

# print(mydb)
# class Person(db.Entity):
#     user = Required(str)
#     passeord = Required(int)

# @db_session
# def insert():
#     pass
   
entity.db.bind(provider='mysql',host='31.170.164.51', user='u889934763_p00nani', passwd='Pp0526767682!', db='u889934763_recipeUsers')
entity.db.generate_mapping(create_tables=True)

@app.route('/login', methods=['GET','POST'])
def login ():
    if(request.method == 'POST'):
        data = request.get_json()
        print(data['name'])
        if(data['name'] == 'jayber1@gmail.com'):
            return jsonify({'data':'true'})
        else:
            return jsonify({'data':'false'})  
    return jsonify([{'nana':'lala'},2,3])
    

@app.route('/logout', methods=['GET','POST'])
def logout():
    return jsonify({'logout':'true'})
    

if __name__ == "__main__":
    
    app.run(debug=True,host='127.0.0.1',port='5001')