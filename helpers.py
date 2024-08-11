from hashlib import md5

from models import db, Country, Landmark, Hotel, Restaurant

def get_index_list():
    countries = db.session.query(Country).all()
    result = []

    for country in countries:
        result.append({
            'id': country.id,
            'name': country.name,
        })

    return result



def get_country_details(country_id):
    country = db.session.query(Country).get(country_id)
    landmarks = db.session.query(Landmark).filter_by(country_id=country_id).all()
    hotels = db.session.query(Hotel).filter_by(country_id=country_id).all()
    restaurants = db.session.query(Restaurant).filter_by(country_id=country_id).all()

    data = {
        'country': country,
        'landmarks': landmarks,
        'hotels': hotels,
        'restaurants': restaurants,
    }

    return data


def get_landmarks_list(country_id):
    landmarks = db.session.query(Landmark).filter_by(country_id=country_id).all()
    result = []

    for landmark in landmarks:
        result.append({
            'id': landmark.id,
            'name': landmark.name,
            'address': landmark.address,
            'history': landmark.history,
        })

    return result


def get_hotels_list(country_id):
    hotels = db.session.query(Hotel).filter_by(country_id=country_id).all()
    result = []

    for hotel in hotels:
        result.append({
            'id': hotel.id,
            'name': hotel.name,
            'address': hotel.address,
            'cuisine': hotel.rating,
        })

    return result


def get_restaurants_list(country_id):
    restaurants = db.session.query(Restaurant).filter_by(country_id=country_id).all()
    result = []

    for restaurant in restaurants:
        result.append({
            'id': restaurant.id,
            'name': restaurant.name,
            'address': restaurant.address,
            'cuisine': restaurant.cuisine,
        })

    return result

