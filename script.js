// Clave de Azure Maps
const azureMapsKey = "31sqeG1tgZibbGlCVSjGMTp7Ui9ZPC816xcx30NvlhiLZpcO5iqkJQQJ99ALAC5RqLJXG3hSAAAgAZMP3XTj"; // Reemplaza con tu clave de Azure Maps

// Inicializar Azure Maps
function initializeMap(centerCoordinates = [2.1734, 41.3851]) {
    const map = new atlas.Map("map", {
        center: centerCoordinates,
        zoom: 12,
        view: "Auto",
        authOptions: {
            authType: "subscriptionKey",
            subscriptionKey: azureMapsKey
        }
    });

    // Añadir controles de navegación
    map.controls.add(new atlas.control.ZoomControl(), {
        position: "top-right"
    });

    return map;
}

// Mostrar marcador en el mapa
function addMarker(map, coordinates, label) {
    new atlas.HtmlMarker({
        position: coordinates,
        text: label,
        color: "red"
    }).addTo(map);
}

// Botón para verificar AQI
document.getElementById("checkAQI").addEventListener("click", async () => {
    const location = document.getElementById("location").value;
    const activity = document.getElementById("activity").value;
    if (location) {
        alert(`Checking AQI for: ${location}, Activity: ${activity}`);
        // Aquí se integrará Logic Apps
    } else {
        alert("Please enter a location.");
    }
});

// Botón para usar ubicación actual
document.getElementById("useMyLocation").addEventListener("click", async () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Muestra las coordenadas en la consola para verificar
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                // Inicializa el mapa centrado en la ubicación actual
                const map = initializeMap([longitude, latitude]);
                addMarker(map, [longitude, latitude], "You are here!");
            },
            (error) => {
                // Manejo de errores
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    default:
                        alert("An unknown error occurred.");
                        break;
                }
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// Inicializar el mapa al cargar la página
initializeMap();
