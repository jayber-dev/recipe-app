import sys
from pony.orm import *

# sys.path.append('C:\Users\evgenyber\Desktop\development studies\\recipe-app\server')

# from server import app

print('hello from entities')
db = Database()

class Person(db.Entity):
    user = Required(str)
    passeord = Required(int)
    
# db.generate_mapping(create_tables=True)

# @db_session
# def insert():
#     pass
    
# db.bind(provider='mysql', host='localhost:4036', user='root', passwd='', db='recipeUser')
