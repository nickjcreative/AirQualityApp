// URL de tu Logic App
const logicAppUrl = "https://prod-29.spaincentral.logic.azure.com:443/workflows/3954ab7e285f4c6a926580eee78a8bca/triggers/Step1/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FStep1%2Frun&sv=1.0&sig=tQYqGAH3nJKisF0xeFcGJ8OeR7655sZ9B7qvH8lwNkE"; // Reemplaza con la URL del trigger HTTP

// Seleccionar el formulario y agregar un evento al enviarlo
document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtener la ubicación ingresada por el usuario
    const location = document.getElementById('location').value;

    // Hacer una solicitud POST a la Logic App
    fetch(logicAppUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location }) // Enviar la ubicación como JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la respuesta de la Logic App");
        }
        return response.json();
    })
    .then(data => {
        // Mostrar los datos en el contenedor #weather-info
        document.getElementById('weather-info').innerHTML = `
            <p><strong>Air Quality Index (AQI):</strong> ${data.aqi}</p>
            <p><strong>Recommendations:</strong> ${data.recommendations}</p>
        `;

        // Mostrar el mapa centrado en las coordenadas
        loadMap(data.latitude, data.longitude);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud: ' + error.message);
    });
});

//
let map;

// Función para cargar el mapa en el contenedor #map
function loadMap(latitude, longitude) {
    if (!map) {
        // Inicializar el mapa la primera vez
        map = new atlas.Map('map', {
            center: [longitude, latitude],
            zoom: 10,
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: "<TU_CLAVE_DE_AZURE_MAPS>" // Reemplaza con tu clave
            }
        });
    } else {
        // Actualizar el centro del mapa si ya está inicializado
        map.setCamera({
            center: [longitude, latitude]
        });
    }
}
