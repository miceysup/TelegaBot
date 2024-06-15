document.addEventListener('DOMContentLoaded', () => {
    const cityButtons = document.querySelectorAll('.city-button');
    const lowBar = document.querySelector('.scale-low');
    const mediumBar = document.querySelector('.scale-medium');
    const highBar = document.querySelector('.scale-high');
    const notificationText = document.getElementById('notificationCount');
    const cityInput = document.querySelector('.city-input');
    const suggestionsContainer = document.querySelector('.suggestions');
    const mainButton = Telegram.WebApp.MainButton;
    const container = document.querySelector('.container');
    let cities = [];

    fetch('cities.json')
        .then(response => response.json())
        .then(data => cities = data.cities);

    cityButtons.forEach(button => {
        button.addEventListener('click', () => {
            cityButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            const city = button.textContent;
            updateNotificationCount(city);
            hideSuggestions();
        });
    });

    cityInput.addEventListener('input', () => {
        cityButtons.forEach(btn => btn.classList.remove('selected'));
        const query = cityInput.value.toLowerCase();
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(query));
        showSuggestions(filteredCities);
        updateNotificationCount(cityInput.value);
    });

    cityInput.addEventListener('focus', () => {
        container.style.paddingTop = '20px';
        mainButton.show();
    });

    function updateNotificationCount(city) {
        resetScales();
        let notificationCount;

        if (city === 'Любой') {
            highBar.classList.add('selected');
            highBar.style.flex = '3';
            mediumBar.style.flex = '1';
            lowBar.style.flex = '1';
            notificationCount = 99;
        } else if (['Warsaw', 'Krakow'].includes(city)) {
            mediumBar.classList.add('selected');
            mediumBar.style.flex = '3';
            highBar.style.flex = '1';
            lowBar.style.flex = '1';
            notificationCount = 80;
        } else if (cities.includes(city)) {
            lowBar.classList.add('selected');
            lowBar.style.flex = '3';
            mediumBar.style.flex = '1';
            highBar.style.flex = '1';
            notificationCount = 30;
        } else {
            notificationCount = 0;
        }

        notificationText.textContent = `Вы будете получать около ${notificationCount} уведомлений в неделю по выбранным параметрам`;
        mainButton.show();
    }

    function resetScales() {
        document.querySelectorAll('.scale').forEach(scale => scale.classList.remove('selected'));
        lowBar.style.flex = '1';
        mediumBar.style.flex = '1';
        highBar.style.flex = '1';
    }

    function showSuggestions(filteredCities) {
        suggestionsContainer.innerHTML = '';
        if (filteredCities.length > 0) {
            filteredCities.forEach(city => {
                const suggestionItem = document.createElement('div');
                suggestionItem.textContent = city;
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.addEventListener('click', () => {
                    cityInput.value = city;
                    updateNotificationCount(city);
                    hideSuggestions();
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
            suggestionsContainer.style.display = 'block';
        } else {
            hideSuggestions();
        }
    }

    function hideSuggestions() {
        suggestionsContainer.style.display = 'none';
    }

    Telegram.WebApp.expand();
    mainButton.setText('Далее');
    mainButton.onClick(() => {
        window.location.href = 'final-page.html';
    });

    // Добавляем обработчик для кнопки "Назад"
    Telegram.WebApp.BackButton.show();
    Telegram.WebApp.BackButton.onClick(() => {
        window.location.href = 'index.html'; // Перенаправление на первую страницу
    });
});
