document.getElementById('rental-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const priceRange = document.getElementById('price-range').value;
    const propertyType = document.getElementById('property-type').value;

    const results = document.getElementById('listings');
    results.innerHTML = `
        <p>Местоположение: ${location}</p>
        <p>Диапазон цен: ${priceRange}</p>
        <p>Тип недвижимости: ${propertyType}</p>
    `;
});
