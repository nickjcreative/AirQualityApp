// Seleccionar el formulario y agregar un evento al enviarlo
document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtener la ubicación ingresada por el usuario
    const location = document.getElementById('location').value;

    // URL de tu Azure Logic App
    const logicAppUrl = 'https://<URL_de_tu_Logic_App>';

    // Realizar una solicitud POST a la Logic App
    fetch(logicAppUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location: location }) // Enviar la ubicación como JSON
    })
    .then(response => response.json()) // Procesar la respuesta como JSON
    .then(data => {
        // Mostrar los datos en el contenedor #weather-info
        document.getElementById('weather-info').innerHTML = `
            <p><strong>Air Quality Index (AQI):</strong> ${data.aqi}</p>
            <p><strong>Recommendations:</strong> ${data.recommendations}</p>
        `;

        // Llamar a la función para mostrar el mapa con las coordenadas
        loadMap(data.latitude, data.longitude);
    })
    .catch(error => {
        console.error('Error al conectar con la Logic App:', error);
    });
});
