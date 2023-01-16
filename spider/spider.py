
import re
from playwright.sync_api import sync_playwright
from pony.orm import *
import requests
import json

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

@db_session
def get_data():
    data = list(Recipes.select())
    for i in data:
        print(i.ingredients)
    

# pw = sync_playwright().start()

# br =  pw.chromium.launch(headless=False)

# page = br.new_page()

# page.goto('http://127.0.0.1:4200/register')

body = {'q': "ביצים"}

data = requests.post('https://www.rami-levy.co.il/api/catalog?', json=body)
json_data = (json.loads(data.text))

# print(f'name: {json_data["data"][0]["name"]}  {json_data["data"][0]["price"]}')

for i in json_data['data']:
    print(f"name: {i['name']} ----------------|--------------- price: {i['price']['price']}")

get_data()