function initMap() {
  const ubication = new localization(() => {

    const options = {
      center: {
        lat: ubication.latitude,
        lng: ubication.longitude
      },
      zoom: 16
    }

    let map = document.getElementById('map');

    const mapa = new google.maps.Map(map, options);
  });
}
