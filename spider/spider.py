
import re
from playwright.sync_api import sync_playwright
from pony.orm import *
import requests
import json
from lxml import *
from bs4 import BeautifulSoup
import time


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
def get_mega_data():
    data = list(Recipes.select())


    for i in range(len(data)):
        temp_data.append(json.loads(data[i].ingredients.replace("'",'"')))

    # for i in temp_data:
        # for j in i:
      
    # param= 'חלב'
    # body = {
    #     'appId': 4,

    # }
    # res = requests.get(f'https://www.mega.co.il/v2/retailers/1182/branches/1976/products?appId=4&filters=%7B%22must%22:%7B%22exists%22:%5B%22family.id%22,%22family.categoriesPaths.id%22,%22branch.regularPrice%22%5D,%22term%22:%7B%22branch.isActive%22:true,%22branch.isVisible%22:true%7D%7D,%22mustNot%22:%7B%22term%22:%7B%22branch.regularPrice%22:0%7D%7D%7D&from=0&isSearch=true&languageId=1&query={param}size=8')
    
    # json_data = (json.loads(res.text))
    # print(f"{json_data['products'][0]['branch']} \n")
    # print(json_data['products'][0]['branch']['regularPrice'])
    # print(json_data['products'][0]['localName'])
    return 0


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
                if json_data['data'][0]['prop']['by_kilo']:
                    print('added')
                    j['by_kilo'] = 'true'
            except:
                pass
    
    print(temp_data)
    for i in range(len(data)):
        data[i].ingredients = str(temp_data[i])

    print('process done')


@db_session
def get_shufersal_data():
    global_init_time = time.perf_counter()
    print(f'process begins {global_init_time:0.2f}')
    db_data = list(Recipes.select())
    temp_data = []
    
    pw = sync_playwright().start()
    br = pw.firefox.launch(headless=True)
    page = br.new_page()

    for i in range(len(db_data)):
        temp_data.append(json.loads(db_data[i].ingredients.replace("'",'"')))
    
    counter = 0
    
    for i in temp_data:
        for j in i:
            loop_init_time = time.perf_counter()
            param = j['ingredient']
            # param = 'חלב', 
            print('before call')
            init_time = (time.perf_counter())
            page.goto(f'https://www.shufersal.co.il/online/he/search?text={param}')
            print('after call')
            end_time = time.perf_counter() - init_time
            print(f'{end_time:0.4f}')
            data = page.content()
            pasrsed_data = BeautifulSoup(data, features='html.parser')
            # main = (pasrsed_data.main.find_all(id="tabPane1"))
            line = pasrsed_data.find_all(class_='line')
            
            item_price = line[0].find(class_='number').text
            try:
                kg_price = line[0].find(class_='priceUnit')
                kg_price_text = kg_price.text.replace('"', '&quot; ' )
                
                print(item_price_text + " " + kg_price_text)
                j['shufersal_price'] = item_price_text
                j['price_in_kg'] = 'true'
            except:
                item_price_text = item_price.replace('\n', '').replace(' ','')
                j['shufersal_price'] = item_price_text
            # for i in main:
            #     price_number = i.find_all(class_='number')
            #     kg_price = i.find_all(class_='priceUnit')
            #     sib = (price_number[0].next_sibling)
            #     print(sib._find_all(class_='priceUnit'))
            
            # for i in main:
            #     price = i.find_all(class_='line')
            #     print(price)
            # j['shufersal_price'] = price_number[0].text.replace('\n', '').replace(' ','')
            print(f'ingredient: {j["ingredient"]} cost: {j["shufersal_price"]}')
            print('next search: %s' % j['shufersal_price'])
            counter += 1
            print(counter)
            print(f'loop time was : {time.perf_counter() - loop_init_time:0.2f}')
    
    for i in range(len(db_data)):
        db_data[i].ingredients = str(temp_data[i])
        
    
    print(f'total number of calls: {counter}')
    br.close()
    global_end_time = time.perf_counter() - global_init_time
    print(f'time it took it to make the whole procces: {global_end_time:0.2f}')


def get_data():
    return 0

# get_rami_levi_data()
# get_mega_data()
# get_shufersal_data()
get_data()