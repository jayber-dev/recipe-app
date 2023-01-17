
import re
from playwright.sync_api import sync_playwright
from pony.orm import *
import requests
import json
from lxml import *
from bs4 import BeautifulSoup

db = Database()

db.bind(provider='sqlite', filename='../server/db.sqlite')


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


db.generate_mapping()

temp_data =[]

@db_session
def get_rami_levi_data():
    data = list(Recipes.select())

    for i in range(len(data)):
        temp_data.append(json.loads(data[i].ingredients.replace("'",'"')))

    for i in temp_data:
        for j in i:
            body = {'q': j["ingredient"]}
            res = requests.post('https://www.rami-levy.co.il/api/catalog?', json=body)
            json_data = (json.loads(res.text))
   
            try:
                j['rami_price'] = json_data['data'][0]['price']['price']
            except:
                pass

    for i in range(len(data)):
        data[i].ingredients = str(temp_data[i])

    print('process done')


@db_session
def get_shufersal_data():
    db_data = list(Recipes.select())
    temp_data = []
    
    pw = sync_playwright().start()
    br = pw.firefox.launch(headless=False)
    page = br.new_page()

    for i in range(len(db_data)):
        temp_data.append(json.loads(db_data[i].ingredients.replace("'",'"')))
        
    for i in temp_data:
        for j in i:
            param = j['ingredient']
            page.goto(f'https://www.shufersal.co.il/online/he/search?text={param}')
            data = page.content()
            pasrsed_data = BeautifulSoup(data, features='html.parser')
            main = (pasrsed_data.main.find_all(id="tabPane1"))

            for i in main:
                price_number = ((i.find_all(class_='number')))
            
            j['shufersal_price'] = price_number[0].text
        print('next search: %s' % j['shufersal_price'])
    print(temp_data)
    
    
    
   
    
    
    br.close()


get_rami_levi_data()
# get_rami_levi_data()