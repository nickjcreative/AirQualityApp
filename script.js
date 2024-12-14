// URL de tu Logic App
const logicAppUrl = "https://<URL_DE_TU_LOGIC_APP>"; // Reemplaza con la URL de tu trigger HTTP

// Seleccionar el formulario y agregar un evento al enviarlo
document.getElementById('location-form').addEventListener('submit', function (event) {
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

            // Llamar a la función para mostrar el mapa con las coordenadas
            loadMap(data.latitude, data.longitude);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud: ' + error.message);
        });
});

// ------------------------------------------------
// Configuración de Azure Maps
// ------------------------------------------------

// Variable para almacenar el mapa
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
                subscriptionKey: "31sqeG1tgZibbGlCVSjGMTp7Ui9ZPC816xcx30NvlhiLZpcO5iqkJQQJ99ALAC5RqLJXG3hSAAAgAZMP3XTj" // Reemplaza con tu clave de Azure Maps
            }
        });
    } else {
        // Actualizar el centro del mapa si ya está inicializado
        map.setCamera({
            center: [longitude, latitude]
        });
    }
}
