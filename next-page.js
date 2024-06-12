const cityButtons = document.querySelectorAll('.city-button');
const notificationsCount = document.getElementById('notifications-count');

cityButtons.forEach(button => {
    button.addEventListener('click', () => {
        cityButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        
        // Логика для изменения уведомлений
        const city = button.textContent;
        if (city === 'Любой') {
            notificationsCount.textContent = 100;
        } else if (city === 'Amsterdam' || city === 'Rotterdam') {
            notificationsCount.textContent = 80;
        } else {
            notificationsCount.textContent = 30;
        }
    });
});

document.getElementById('nextButton').addEventListener('click', () => {
    window.location.href = 'final-page.html';
});








