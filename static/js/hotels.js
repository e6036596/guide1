'use strict';

function addHotel() {
    const data = {
        name: document.getElementById('hotel_name_input').value,
        address: document.getElementById('hotel_address_input').value,
        description: document.getElementById('hotel_description_input').value
    };

    fetch('/hotels', {
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
        alert('Отель добавлен в БД');
        window.location.reload();
    }).catch(error => {
        alert('Ошибка при добавлении отеля в БД: ' + error);
    });
}

function deleteHotel(hotelId) {
    const data = { hotel_id: hotelId };

    fetch('/hotels', {
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
        alert('Отель удален из БД');
        window.location.reload();
    }).catch(error => {
        alert('Ошибка при удалении отеля: ' + error);
    });
}

const edit_hotel_input = document.getElementById('edit_hotel_name');
const edit_hotel_address_input = document.getElementById('edit_hotel_address');
const edit_hotel_rating_input = document.getElementById('edit_hotel_rating');
let hotel_id = null;

function editHotel(hotel) {
    edit_hotel_input.value = hotel.name;
    edit_hotel_address_input.value = hotel.address;
    edit_hotel_rating_input.value = hotel.rating;
    hotel_id = hotel.id;
}

function saveHotelData() {
    const data = {
        name: edit_hotel_input.value,
        address: edit_hotel_address_input.value,
        rating: edit_hotel_rating_input.value,
        id: hotel_id,
    };

    fetch('/hotels', {
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
        alert('Ошибка при обновлении данных отеля: ' + error);
    });
}
