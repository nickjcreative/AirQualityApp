document.addEventListener('DOMContentLoaded', function () {
    const logicAppUrl = "https://prod-29.spaincentral.logic.azure.com:443/workflows/3954ab7e285f4c6a926580eee78a8bca/triggers/Step1/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FStep1%2Frun&sv=1.0&sig=tQYqGAH3nJKisF0xeFcGJ8OeR7655sZ9B7qvH8lwNkE"; // Reemplaza con tu URL
    const locationName = document.getElementById('location-name');
    const qualityAir = document.getElementById('quality-air');
    const recommendations = document.getElementById('recommendations');
    const resultsDiv = document.getElementById('results');
    const activitiesDiv = document.getElementById('activities');
    let map;

    // Inicializar mapa con ubicación predeterminada (Barcelona)
    const initialLatitude = 41.3851; // Coordenada de Barcelona
    const initialLongitude = 2.1734; // Coordenada de Barcelona

    loadMap(initialLatitude, initialLongitude);

    // Manejar envío del formulario
    document.getElementById('location-form').addEventListener('submit', function (event) {
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
                console.log("Datos recibidos:", data);

                // Validar datos y extraer coordenadas
                const firstResult = data.results?.[0];
                if (!firstResult || !firstResult.geometry) {
                    throw new Error("No se encontraron coordenadas válidas.");
                }

                const { lat, lng } = firstResult.geometry;

                // Actualizar información
                locationName.textContent = location;
                qualityAir.textContent = data.aqi || "N/A";
                recommendations.textContent = data.recommendations || "N/A";

                // Mostrar resultados y actividades
                resultsDiv.classList.remove('hidden');
                activitiesDiv.classList.remove('hidden');

                // Actualizar mapa
                loadMap(lat, lng);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al obtener datos: ' + error.message);
            });
    });

    function loadMap(latitude, longitude) {
        if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
            console.error("Coordenadas inválidas:", latitude, longitude);
            return;
        }

        if (!map) {
            map = new atlas.Map('map', {
                center: [longitude, latitude],
                zoom: 10,
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: "<TU_CLAVE_DE_AZURE_MAPS>" // Reemplaza con tu clave
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

            map.markers.clear();
            const marker = new atlas.HtmlMarker({
                position: [longitude, latitude],
                text: '📍'
            });
            map.markers.add(marker);
        }
    }
});
