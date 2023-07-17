import requests
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def fetch_car_data(model):
    headers= {
        "X-Api-Key": "+v4lOfHB/+HKl+jYlo3yuw==PCJ5V1nLmL0kRyVB"

    }
    url = f"https://api.api-ninjas.com/v1/cars?limit=2&model={model}"
    response = requests.get(url, headers)
    if response.status_code == 200:
        cars_data = response.json()
        # Process the cars_data and create Car objects
        for car_data in cars_data:
            car = Car(
                year=car_data['year'],
                brand=car_data['make'],
                car_name=car_data['model'],
                car_type=car_data['class'],
                engine=car_data['displacement'],
                transmission=car_data['transmission'],
                trim=car_data['trim']
            )
        return cars_data

    else:
        # Handle error if the request fails
        print(f"Error: {response.status_code}")
