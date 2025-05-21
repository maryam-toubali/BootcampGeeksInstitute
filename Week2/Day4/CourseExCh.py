#SQLite database operations in Python
#Connecting to SQLite database
import sqlite3
conn = sqlite3.connect('database.sqlite')
cursor = conn.cursor()
print("Opened database successfully")
#Creating a table
cursor.execute('''CREATE TABLE EMPLOYEE
         (ID INT PRIMARY KEY     NOT NULL,
         NAME           TEXT    NOT NULL,
         AGE            INT     NOT NULL);''')
cursor.close()
#Inserting values in tables
import sqlite3
conn = sqlite3.connect('database.sqlite')
cursor = conn.cursor()
cursor.execute("INSERT INTO EMPLOYEE (ID, NAME, AGE) VALUES (1, 'Razi', 14)")
conn.commit()
conn.close()
#Deleting table values
import sqlite3
conn = sqlite3.connect('database.sqlite')
cursor = conn.cursor()
conn.execute("DELETE from EMPLOYEE where ID = 1")
conn.commit()
conn.close()

#Databases in Python
#Connecting to a database in Python
#First, install the appropriate library. Psycopg2 for PostgreSQL. : pip install psycopg2
#Import it into your python code:
import psycopg2
#Define the appropriate connection details:
HOSTNAME = 'localhost'
USERNAME = 'postgres'
PASSWORD = 'admin'
DATABASE = 'dvdrental'
#Using those details, we can now create a connection object:
connection = psycopg2.connect(host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE )
#From the connection object, we can get a cursor. Think of this as the place that runs your queries, kind like the pgAdmin query tool.
cursor = connection.cursor()
#Now we can define our query:
query = "SELECT * FROM customer LIMIT 20;"
#Submit it to the cursor to execute it:
cursor.execute(query)
#The cursor now contains a result set. We need to fetch it into Python memory. This will give us a list of results:
results = cursor.fetchall()
#Close your database connection, or make another request:
connection.close()
#Pocess the results object however you like:
for item in results:
        print(item)

#Full Exemple:
import psycopg2
# 1. Connect to the database
DB_NAME = "hollywood"
USER = "postgres" 
PASSWORD = "admin" 
HOST = "localhost"
PORT = "5432" # or 5433
# 3. Write an SQL query
def create_table(table_name: str): 
    """create new table with id, num"""
    query = f'''
    create table {table_name}(
        id serial primary key,
        num integer not null
    );
    '''
    cursor.execute(query) # execute the query
    connection.commit() # make changes in the database
def insert_into_table(table_name: str, num_value: int):
    query = f'''
    insert into {table_name}(num)
    values
    ({num_value})
    '''
    cursor.execute(query) # execute the query
    connection.commit() # make changes in the database
def select_all(table_name: str):
    query = f'''
    select * from {table_name};
    '''
    cursor.execute(query)
    output = cursor.fetchall()
    return output
if __name__ == '__main__':
    try:
        connection = psycopg2.connect(
            dbname = DB_NAME,
            user = USER,
            password = PASSWORD,
            host = HOST,
            port = PORT
        )
    except Exception as e:
        print(f"Error: {e}")
    # 2. Create a cursor object
    cursor = connection.cursor()
    table_name = 'new_table3'
    create_table(table_name)
    insert_into_table(table_name, 12312)
    insert_into_table(table_name, 88888)
    print(select_all(table_name))
    # 4. Close database connection
    connection.close()
    
    #
import sqlite3
from tabulate import tabulate

def order():
    choice = None
    while choice != "X":
        print("Moti's Fruit Shake Stand with questionable hygiene")
        inv = get_inv()
        print(tabulate(inv, headers=['Fruit', 'Amount']))
        choice = input("What do you want to add to your shake?")
        update_inv(choice)
    else:
        print("Bye")

def update_inv(choice):
    query = f"UPDATE fruit SET quantity=quantity-1 WHERE name = '{choice}';"
    return run_query(query)

def get_inv():
    query = "SELECT name, quantity FROM fruit ORDER BY name ASC;"
    return run_query(query)

def run_query(query):
    connection = sqlite3.connect("shakes.db")
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
    results = cursor.fetchall()
    connection.close()
    return results

#
import requests
import json
import sqlite3
from faker import Faker
from time import time

def get_jokes(n):
    for i in range(n):
        print(i + 1)
        url = 'https://api.chucknorris.io/jokes/random'
        data = requests.get(url)
        data = data.json()
        joke = data['value']
        joke = joke.replace("'", "")
        connection = sqlite3.connect('jokes.db')  #Make a connection to the database
        cursor = connection.cursor() #Think of the cursor as the place that executes queries
        query = f"INSERT INTO jokes (joke) VALUES ('{joke}');"
        query_result = cursor.execute(query)  #Cursor runs the query
        connection.commit()  #Finalize the result. "Write" it to the DB
        # results = cursor.fetchall() #Fetch theh results back from the cursor into python variable
        connection.close()  #Close the connection

def gen_fake_data(n):
    start = time();
    f = Faker()
    connection = sqlite3.connect('jokes.db')  #Make a connection to the database
    cursor = connection.cursor() #Think of the cursor as the place that executes queries
    for i in range(n):
        print(i + 1)
        name = f.name()
        query = f"INSERT INTO jokes (joke) VALUES ('{name}');"
        query_result = cursor.execute(query)  #Cursor runs the query
    connection.commit()  #Finalize the result. "Write" it to the DB
    connection.close()
    end = time();
    print(f"The function ran in {round(end-start,2)}s")