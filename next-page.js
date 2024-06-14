document.addEventListener('DOMContentLoaded', () => {
    const cityButtons = document.querySelectorAll('.city-button');
    const lowBar = document.querySelector('.scale-low');
    const mediumBar = document.querySelector('.scale-medium');
    const highBar = document.querySelector('.scale-high');
    const notificationText = document.getElementById('notificationCount');
    const cityInput = document.querySelector('.city-input');
    const mainButton = Telegram.WebApp.MainButton;
    const container = document.querySelector('.container');
    const resultsContainer = document.getElementById('results-container');
    let cities = [];

    // Load the list of cities from the cities.json file
    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            cities = data;
            setupAutocomplete(cityInput, cities);
        });

    cityButtons.forEach(button => {
        button.addEventListener('click', () => {
            cityButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            const city = button.textContent;
            updateNotificationCount(city);
        });
    });

    cityInput.addEventListener('input', () => {
        cityButtons.forEach(btn => btn.classList.remove('selected'));
        updateNotificationCount(cityInput.value);
        showResults(cityInput.value);
    });

    cityInput.addEventListener('focus', () => {
        container.style.paddingTop = '20px'; // Устанавливаем одинаковый отступ сверху при фокусировке
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
        } else {
            lowBar.classList.add('selected');
            lowBar.style.flex = '3';
            mediumBar.style.flex = '1';
            highBar.style.flex = '1';
            notificationCount = 30;
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

    function showResults(query) {
        if (query.trim().length > 0) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `<p>Ищем жильё в городе: ${query}</p>`;
        } else {
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
        }
    }

    function setupAutocomplete(input, cities) {
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const suggestions = cities.filter(city => city.toLowerCase().includes(value));
            showSuggestions(suggestions);
        });
    }

    function showSuggestions(suggestions) {
        if (suggestions.length > 0) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = suggestions.map(suggestion => `<p>${suggestion}</p>`).join('');
        } else {
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
        }
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
