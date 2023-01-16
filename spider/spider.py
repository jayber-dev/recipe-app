
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


def get_shufersal_data():

    pw = sync_playwright().start()
    br = pw.chromium.launch(headless=False)
    page = br.new_page()
    page.goto('https://www.shufersal.co.il/online/he/search?text=%D7%97%D7%9C%D7%91')
    # print(page.check('#wrapper'))
    # param = 'חלב'
    # data = BeautifulSoup(requests.get('https://www.shufersal.co.il/online/he/search?',params=param).text, features='lxml')

    # # print(data.findChildren('div'))
    # main = data.main

    # print(main.find('div', {"id":"wrapper"}))
    # print(main_wrapper)
    br.close()


get_shufersal_data()
# get_rami_levi_data()