import requests
import random
from sqlalchemy import create_engine, Column, Integer, String, BigInteger
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DB Setup:
DATABASE_URL = "postgresql://postgres:admin@localhost:5432/bootcamp"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

# Country model: 
class Country(Base):
    __tablename__ = 'countries'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    capital = Column(String(100))
    flag = Column(String)
    subregion = Column(String(100))
    population = Column(BigInteger)

# Create table (if not exists)
Base.metadata.create_all(engine)

# Fetch Data from API:
url = "https://restcountries.com/v3.1/all"
response = requests.get(url)

if response.status_code == 200:
    all_countries = response.json()
    selected = random.sample(all_countries, 10)

    for country in selected:
        try:
            name = country.get('name', {}).get('common', 'N/A')
            capital = country.get('capital', ['N/A'])[0]
            flag = country.get('flags', {}).get('png', 'N/A')
            subregion = country.get('subregion', 'N/A')
            population = country.get('population', 0)

            c = Country(
                name=name,
                capital=capital,
                flag=flag,
                subregion=subregion,
                population=population
            )
            session.add(c)

        except Exception as e:
            print(f"Error inserting country: {e}")

    session.commit()
    print("10 countries inserted successfully.")
else:
    print("Failed to fetch data from the API.")
