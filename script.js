// Clave de Azure Maps
const azureMapsKey = "YOUR_AZURE_MAPS_KEY"; // Reemplaza con tu clave

// Inicializar Azure Maps
function initializeMap(centerCoordinates = [2.1734, 41.3851]) {
    const map = new atlas.Map("map", {
        center: centerCoordinates, // Coordenadas iniciales
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
    if (location) {
        alert(`Checking AQI for: ${location}`);
        // Aquí se integrará Logic Apps
    } else {
        alert("Please enter a location.");
    }
});

// Botón para usar ubicación actual
document.getElementById("useMyLocation").addEventListener("click", async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const map = initializeMap([longitude, latitude]);
            addMarker(map, [longitude, latitude], "You are here!");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// Inicializar el mapa al cargar la página
initializeMap();
