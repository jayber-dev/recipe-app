from flask import Flask,jsonify,request
import json
import mysql.connector
from flask_cors import CORS


app = Flask(__name__)
CORS(app=app)




@app.route('/login', methods=['GET','POST'])
def login ():
    if(request.method == 'GET'):
        # print(requests)
        return jsonify([{'nana':'lala'},2,3])
    elif(request.method == 'POST'):
        data = request.get_json()
        print(data['name'])
        if(data['name'] == 'jayber1@gmail.com'):
            return jsonify({'data':'true'})
        else:
            return jsonify({'data':'false'})  
        # return data

@app.route('/logout', methods=['GET','POST'])
def logout():
    return jsonify({'logout':'true'})
    


if __name__ == "__main__":
    app.run(debug=True,host='127.0.0.1',port='5001')