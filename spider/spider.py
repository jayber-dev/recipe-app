import re
from playwright.sync_api import sync_playwright

import requests
import json




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

