'use strinct'


// add button function
const addBtn = document.getElementById('addBtn')

addBtn.onclick = () => {
    const name = document.getElementById('add_name').value
    
    const data = {
        name: name,
    }

    fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json()
    }).then(data => {
        alert('Данные успено сохранены в БД,')
        window.location.reload()
    }).catch(error => {
        alert('Ошибка при добавлении в БД,', error)
    })
}

// delete button

function deleteCountry(countryId) {
    fetch(`/country_details/${countryId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'OK') {
            console.log('Страна удалена');
            window.location.href = '/'; 
        } else {
            console.error('Ошибка при удалении страны');
        }
    });
}
