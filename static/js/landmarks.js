'use strict';

function addLandmark() {
    const data = {
        name: document.getElementById('landmark_name_input').value,
        address: document.getElementById('landmark_address_input').value,
        history: document.getElementById('landmark_history_input').value
    };

    fetch('http://127.0.0.1:8000/landmarks', {
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
        alert('Достопримечательность добавлена в БД');
        window.location.reload();
    }).catch(error => {
        alert('Ошибка при добавлении в БД: ' + error);
    });
}

function deleteLandmark(landmarkId) {
    const data = { landmark_id: landmarkId };

    fetch('http://127.0.0.1:8000/landmarks', {
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
        alert('Достопримечательность удалена из БД');
        window.location.reload();
    }).catch(error => {
        alert('Ошибка при удалении: ' + error);
    });
}

const edit_landmark_name_input = document.getElementById('edit_landmark_name');
const edit_landmark_address_input = document.getElementById('edit_landmark_address');
const edit_landmark_history_input = document.getElementById('edit_landmark_history');
let landmark_id = null;

function editLandmark(landmark) {
    edit_landmark_name_input.value = landmark.name;
    edit_landmark_address_input.value = landmark.address;
    edit_landmark_history_input.value = landmark.history;
    landmark_id = landmark.id;
}

function saveLandmarkData() {
    const data = {
        name: edit_landmark_name_input.value,
        address: edit_landmark_address_input.value,
        history: edit_landmark_history_input.value,
        landmark_id: landmark_id,
    };

    fetch('http://127.0.0.1:8000/landmarks', {
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
        alert('Ошибка при обновлении: ' + error);
    });
}
