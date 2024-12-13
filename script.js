document.addEventListener('DOMContentLoaded', function () {
    const logicAppUrl = "https://prod-29.spaincentral.logic.azure.com:443/workflows/3954ab7e285f4c6a926580eee78a8bca/triggers/Step1/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FStep1%2Frun&sv=1.0&sig=tQYqGAH3nJKisF0xeFcGJ8OeR7655sZ9B7qvH8lwNkE";

    let map = new atlas.Map('map', {
        center: [-3.7035825, 40.4167047], // Coordenadas iniciales de Barcelona
        zoom: 10,
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: "31sqeG1tgZibbGlCVSjGMTp7Ui9ZPC816xcx30NvlhiLZpcO5iqkJQQJ99ALAC5RqLJXG3hSAAAgAZMP3XTj"
        }
    });

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
            .then(response => response.json())
            .then(data => {
                if (!data.latitude || !data.longitude) {
                    throw new Error("Coordenadas no válidas");
                }

                document.getElementById('location-name').textContent = location;
                document.getElementById('quality-air').textContent = data.aqi || 'N/A';
                document.getElementById('recommendations').textContent = data.recommendations || 'N/A';

                map.setCamera({
                    center: [data.longitude, data.latitude],
                    zoom: 12
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al obtener datos: ' + error.message);
            });
    });
});
