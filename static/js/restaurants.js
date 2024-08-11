'use strict';

function addRestaurant() {
    const data = {
        name: document.getElementById('restaurant_name_input').value,
        address: document.getElementById('restaurant_address_input').value,
        description: document.getElementById('restaurant_description_input').value
    };

    fetch('/restaurants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        alert('Ресторан добавлен в БД');
        window.location.reload();
    }).catch(error => {
        alert('Ошибка при добавлении ресторана в БД: ' + error);
    });
}

function deleteRestaurant(restaurantId) {
    const data = { restaurant_id: restaurantId };

    fetch('/restaurants', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        alert('Ресторан удален из БД');
        window.location.reload();
    }).catch(error => {
        alert('Ошибка при удалении ресторана: ' + error);
    });
}

const edit_restaurant_input = document.getElementById('edit_restaurant_name');
const edit_restaurant_address_input = document.getElementById('edit_restaurant_address');
const edit_restaurant_cuisine_input = document.getElementById('edit_restaurant_description');
let restaurant_id = null;

function editRestaurant(restaurant) {
    edit_restaurant_input.value = restaurant.name;
    edit_restaurant_address_input.value = restaurant.address;
    edit_restaurant_cuisine_input.value = restaurant.description;
    restaurant_id = restaurant.id;
}

function saveRestaurantData() {
    const data = {
        name: edit_restaurant_input.value,
        address: edit_restaurant_address_input.value,
        cuisine: edit_restaurant_cuisine_input.value,
        id: restaurant_id,
    };

    fetch('/restaurants', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        alert('Данные успешно обновлены в БД');
        window.location.reload();
    }).catch(error => {
        alert('Ошибка при обновлении данных ресторана: ' + error);
    });
}
