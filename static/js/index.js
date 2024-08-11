document.addEventListener('DOMContentLoaded', function () {
    const addCountryBtn = document.getElementById('addCountryBtn');
    
    addCountryBtn.addEventListener('click', function () {
        const name = document.getElementById('country_name_input').value;
        
        fetch('/country', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                location.reload();
            } else {
                alert('Ошибка при добавлении страны');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    });

    const deleteCountryBtns = document.querySelectorAll('.delete-country-btn');
    
    deleteCountryBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const countryId = this.getAttribute('data-country-id');
            
            fetch(`/country/${countryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    location.reload();
                } else {
                    alert('Ошибка при удалении страны');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
        });
    });
});
