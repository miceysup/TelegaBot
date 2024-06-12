document.addEventListener('DOMContentLoaded', () => {
    // Load Lottie animation
    var animationContainer = document.getElementById('animationContainer');
    var animation = lottie.loadAnimation({
        container: animationContainer,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'images/WavingHand.json' // Path to your animation file
    });

    // Replay animation on click
    animationContainer.addEventListener('click', () => {
        animation.goToAndPlay(0, true);
    });

    // Handle button click
    document.getElementById('startButton').addEventListener('click', () => {
        window.location.href = 'next-page.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', () => {
        window.location.href = 'next-page.html';
    });
});

document.getElementById('startButton').addEventListener('click', () => {
    window.location.href = 'next-page.html';
});

document.getElementById('startButton').addEventListener('click', () => {
    window.location.href = '/next-page.html';
});

document.getElementById('startButton').addEventListener('click', () => {
    window.location.href = '/next-page.html';
});

Telegram.WebApp.expand(); // Убедимся, что WebApp разворачивается на полный экран


// Initialize Telegram Web App
window.Telegram.WebApp.ready();


