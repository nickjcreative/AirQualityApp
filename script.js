document.addEventListener('DOMContentLoaded', function () {
    // URL de tu Logic App
    const logicAppUrl = "https://prod-29.spaincentral.logic.azure.com:443/workflows/3954ab7e285f4c6a926580eee78a8bca/triggers/Step1/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FStep1%2Frun&sv=1.0&sig=tQYqGAH3nJKisF0xeFcGJ8OeR7655sZ9B7qvH8lwNkE"; // Reemplaza con tu URL

    const form = document.getElementById('location-form');
    const weatherInfo = document.getElementById('weather-info');
    const mapContainer = document.getElementById('map');
    const locationName = document.getElementById('location-name');
    const qualityAir = document.getElementById('quality-air');
    const recommendations = document.getElementById('recommendations');

    let map;

    form.addEventListener('submit', function (event) {
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
                // Actualizar la página con los resultados
                locationName.textContent = location;
                qualityAir.textContent = data.aqi;
                recommendations.textContent = data.recommendations;

                // Mostrar el mapa y la información
                weatherInfo.classList.remove('hidden');
                mapContainer.classList.remove('hidden');

                // Cargar el mapa con las coordenadas
                loadMap(data.latitude, data.longitude);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema con la solicitud: ' + error.message);
            });
    });

    function loadMap(latitude, longitude) {
        if (!latitude || !longitude) {
            alert("Coordenadas no válidas.");
            return;
        }

        if (!map) {
            map = new atlas.Map('map', {
                center: [longitude, latitude],
                zoom: 10,
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: "31sqeG1tgZibbGlCVSjGMTp7Ui9ZPC816xcx30NvlhiLZpcO5iqkJQQJ99ALAC5RqLJXG3hSAAAgAZMP3XTj" // Reemplaza con tu clave
                }
            });

            const marker = new atlas.HtmlMarker({
                position: [longitude, latitude],
                text: '📍'
            });

            map.markers.add(marker);
        } else {
            map.setCamera({
                center: [longitude, latitude]
            });
        }
    }
});
