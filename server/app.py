from flask import Flask,jsonify,request
import json
import mysql.connector
from flask_cors import CORS
from pony.orm import *
import db.entities


app = Flask(__name__)
CORS(app=app)
db = Database()

class Person(db.Entity):
    user = Required(str)
    passeord = Required(int)
    
# db.generate_mapping(create_tables=True)

# @db_session
# def insert():
#     pass
    
# db.bind(provider='mysql', host='localhost:4036', user='root', passwd='', db='recipeUser')

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