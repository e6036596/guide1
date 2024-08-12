from flask import Flask, render_template, request, redirect, url_for, jsonify   
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/db_world_guide'
app.secret_key = 'secret_key'
db.init_app(app)
Migrate(app,db)
 

from models import Country, Landmark, Hotel, Restaurant
from helpers import (
    get_country_details, get_landmarks_list, get_hotels_list, get_restaurants_list, get_index_list
)

@app.route('/', methods=['GET', 'POST', 'DELETE'])
def index():
    if request.method == 'GET':
        countries = get_index_list()
        return render_template('index.html', countries=countries)

    elif request.method == 'POST':
        country = Country(name=request.form.get('name'))
        db.session.add(country)
        db.session.commit()
        return redirect(url_for('index'))

    elif request.method == 'DELETE':
        country_id = int(request.json.get('country_id'))
        country = Country.query.get(country_id)
        if country:
            db.session.delete(country)
            db.session.commit()
            return jsonify({'status': 'OK'})
        return jsonify({'status': 'FAILED'}), 404


@app.route('/country_details/<int:country_id>', methods=['GET', 'DELETE'])
def country_details(country_id):
    if request.method == 'GET':
        country_data = get_country_details(country_id)
        return render_template('country_details.html', **country_data)
    
    elif request.method == 'DELETE':

        country = Country.query.get(country_id)
        if country:
            db.session.delete(country)
            db.session.commit()
            return jsonify({'status': 'OK'})
        return jsonify({'status': 'FAILED'}), 404


@app.route('/landmarks/<int:country_id>', methods=['GET', 'POST', 'DELETE', 'PUT'])
def landmarks(country_id):
    if request.method == 'GET':
        country = Country.query.get_or_404(country_id)
        landmarks = get_landmarks_list(country_id)
        return render_template('landmarks.html', landmarks=landmarks, country_id=country_id, country=country)
    
    elif request.method == 'POST':
        landmark = Landmark(
            name=request.form.get('name'),
            address=request.form.get('address'),
            history=request.form.get('history'),
            country_id=country_id
        )
        db.session.add(landmark)
        db.session.commit()
        return redirect(url_for('landmarks', country_id=country_id))

    elif request.method == 'DELETE':
        landmark_id = int(request.json.get('landmark_id'))
        landmark = Landmark.query.get(landmark_id)
        if landmark:
            db.session.delete(landmark)
            db.session.commit()
            return jsonify({'status': 'OK'})
        return jsonify({'status': 'FAILED'}), 404

    elif request.method == 'PUT':
        landmark_id = int(request.json.get('landmark_id'))
        landmark = Landmark.query.get(landmark_id)
        if landmark:
            landmark.name = request.json.get('name')
            landmark.address = request.json.get('address')
            landmark.history = request.json.get('history')
            db.session.commit()
            return jsonify({'status': 'OK'})
        return jsonify({'status': 'FAILED'}), 404

@app.route('/hotels/<int:country_id>', methods=['GET', 'POST', 'DELETE', 'PUT'])
def hotels(country_id):
    if request.method == 'GET':
        ''' Получаем объект Country по country_id
        Если на странице ты обращаешься к какому-то объекту (например country)
        он должен быть обязательно передан в контексте на каждой странице.
        Из ниоткуда или с другой страницы объект появиться не может))'''
        country = Country.query.get_or_404(country_id)

        hotels = get_hotels_list(country_id)
        return render_template('hotels.html', hotels=hotels, country_id=country_id, country=country)
    
    elif request.method == 'POST':
        hotel = Hotel(
            name=request.form.get('name'),
            address=request.form.get('address'),
            rating=request.form.get('rating'),
            country_id=country_id
        )
        db.session.add(hotel)
        db.session.commit()
        return redirect(url_for('hotels', country_id=country_id))

    elif request.method == 'DELETE':
        hotel_id = int(request.json.get('hotel_id'))
        hotel = Hotel.query.get(hotel_id)
        if hotel:
            db.session.delete(hotel)
            db.session.commit()
            return jsonify({'status': 'OK'})
        return jsonify({'status': 'FAILED'}), 404

    elif request.method == 'PUT':
        hotel_id = int(request.json.get('hotel_id'))
        hotel = Hotel.query.get(hotel_id)
        if hotel:
            hotel.name = request.json.get('name')
            hotel.address = request.json.get('address')
            hotel.rating = request.json.get('description')
            db.session.commit()
            return jsonify({'status': 'OK'})
        return jsonify({'status': 'FAILED'}), 404

@app.route('/restaurants/<int:country_id>', methods=['GET', 'POST', 'DELETE', 'PUT'])
def restaurants(country_id):
    if request.method == 'GET':
        country = Country.query.get_or_404(country_id)

        restaurants = get_restaurants_list(country_id)
        return render_template('restaurants.html', restaurants=restaurants, country_id=country_id, country=country)
    
    elif request.method == 'POST':
        restaurant = Restaurant(
            name=request.form.get('name'),
            address=request.form.get('address'),
            description=request.form.get('description'),
            country_id=country_id
        )
        db.session.add(restaurant)
        db.session.commit()
        return redirect(url_for('restaurants', country_id=country_id))

    elif request.method == 'DELETE':
        restaurant_id = int(request.json.get('restaurant_id'))
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            return jsonify({'status': 'OK'})
        return jsonify({'status': 'FAILED'}), 404

    elif request.method == 'PUT':
        restaurant_id = int(request.json.get('restaurant_id'))
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant:
            restaurant.name = request.json.get('name')
            restaurant.address = request.json.get('address')
            restaurant.cuisine = request.json.get('description')
            db.session.commit()
            return jsonify({'status': 'OK'})
        return jsonify({'status': 'FAILED'}), 404

if __name__ == '__main__':
    app.run(debug=True)
