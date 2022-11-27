from flask import Flask,jsonify,request
# import requests
import json
# from flask_cors import CORS
import flask_cors
from mysql.connector import (connection)

app = Flask(__name__)
flask_cors.CORS(app=app)

wow = connection.MySQLConnection()


@app.route('/auth', methods=['GET','POST'])
def home ():
    if(request.method == 'POST'):
        print(requests)
        return jsonify([{'nana':'lala'},2,3])
    elif(request.method == 'GET'):
        return 'poop'
    


if __name__ == "__main__":
    app.run(debug=True,host='127.0.0.1',port='5001')