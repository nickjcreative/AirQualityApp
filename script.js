document.getElementById("checkAQI").addEventListener("click", () => {
    const location = document.getElementById("location").value;
    if (location) {
        alert(`You entered: ${location}`);
        // Aquí se integrará con Logic Apps en el siguiente paso
    } else {
        alert("Please enter a location.");
    }
});

document.getElementById("useMyLocation").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            alert(`Your location: ${latitude}, ${longitude}`);
            // Aquí se integrará con Logic Apps en el siguiente paso
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Inicializar el mapa de Azure Maps
function initializeMap() {
    const map = new atlas.Map("map", {
        center: [-0.09, 51.505], // Coordenadas iniciales
        zoom: 10,
        authOptions: {
            authType: "subscriptionKey",
            subscriptionKey: azureMapsKey
        }
    });
}

// Llamar a la función al cargar la página
initializeMap();
