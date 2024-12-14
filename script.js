// URL de tu Logic App
const logicAppUrl = "https://prod-29.spaincentral.logic.azure.com:443/workflows/3954ab7e285f4c6a926580eee78a8bca/triggers/Step1/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FStep1%2Frun&sv=1.0&sig=tQYqGAH3nJKisF0xeFcGJ8OeR7655sZ9B7qvH8lwNkE";

// Variable para el mapa
let map;

// Inicializar el mapa con Barcelona por defecto
document.addEventListener('DOMContentLoaded', () => {
    loadMap(41.3851, 2.1734); // Coordenadas de Barcelona
});

// Función para inicializar o actualizar el mapa
function loadMap(latitude, longitude) {
    if (!map) {
        map = new atlas.Map('map', {
            center: [longitude, latitude],
            zoom: 10,
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: "31sqeG1tgZibbGlCVSjGMTp7Ui9ZPC816xcx30NvlhiLZpcO5iqkJQQJ99ALAC5RqLJXG3hSAAAgAZMP3XTj"
            }
        });
    } else {
        map.setCamera({
            center: [longitude, latitude]
        });
    }
}

// Escuchar el formulario para buscar ubicación
document.getElementById('location-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const location = document.getElementById('location').value;

    fetch(logicAppUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la respuesta de la Logic App");
            }
            return response.json();
        })
        .then(data => {
            const { latitude, longitude, aqi, recommendations } = data;

            // Actualizar la información en la página
            document.getElementById('weather-info').innerHTML = `
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Quality Air:</strong> ${aqi}</p>
                <p><strong>Que hacer?:</strong> ${recommendations}</p>
            `;

            // Actualizar el mapa con las coordenadas proporcionadas
            loadMap(latitude, longitude);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener la información: ' + error.message);
        });
});
