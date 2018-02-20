$(document).ready(function() {
  $('.datepicker').pickadate({
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 15, // Creates a dropdown of 15 years to control year,
  today: 'Hoy',
  clear: 'Limpiar',
  close: 'Cerrar',
  closeOnSelect: false, // Close upon selecting a date,

  // The title label to use for the month nav buttons
        labelMonthNext: 'Mes siguiente',
        labelMonthPrev: 'Mes anterior',

// The title label to use for the dropdown selectors
        labelMonthSelect: 'Selecciona un mes',
        labelYearSelect: 'Selecciona un año',

// Months and weekdays
        monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
        monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
        weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
        weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],

// Materialize modified
        weekdaysLetter: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
});
  $('.modal').modal();

  // Creamos variables
  var $modalChatTitle = $('#modal-chat-title');
  var $modalChatMessage = $('#modal-chat-message');
  var $modalImageTitle = $('#modal-image-title');
  var $imageFile = $('#image-file');
  var $modalEventTitle = $('#modal-event-title');
  var $modalEventDate = $('#modal-event-date');
  var $modalMediaTitle = $('#modal-media-title');
  var $mediaFile = $('#media-file');
  var $containerBox = $('#box');
  var $chatSend = $('#chat-send');
  var $imageSend = $('#image-send');
  var $mediaeSend = $('#media-send');
  var $eventSend = $('#event-send');
  var output = $('#map');


  // Creamos una función que creará un nuevo post
  function addPost () {
     if ($modalChatTitle.val().trim().length !== 0) {
    localStorage.chatTitle = $modalChatTitle.val();
    localStorage.chatMessage = $modalChatMessage.val();
    $containerBox.prepend('<div class="card"><div class="card-content"><h4>'+ localStorage.chatTitle +'</h4><p>'+ localStorage.chatMessage +'</p></div></div>');
    }
  }

  // Creamos la función que publicará imágenes responsive
  $imageFile.change(function() {
  		addMedia(this.files[0]);
  	})

  function addMedia(file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        // guardando el localStorage
        localStorage.url = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    function postImage() {
      localStorage.imageTitle = $modalImageTitle.val();
      $containerBox.prepend('<div class="card"><div class="card-content"><h4>'+ localStorage.imageTitle +'</h4><img class="thumb responsive-img" src="'+ localStorage.url +'"</></div></div>');
    }

    $mediaFile.change(function() {
    		addMedia(this.files[0]);
    	})
  function postVideo() {
    localStorage.videoTitle = $modalImageTitle.val();
      $containerBox.prepend('<div class="card"><div class="card-content"><h4>'+ localStorage.videoTitle +'</h4><video class="video-width" src="' + localStorage.url +'"controls loop>'+'</video></div></div>');
  }

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
    });
    var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true,
    });
  }

  /* Función para iniciar búsqueda */
function search(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

/* Función si se encontró la ubicación exitosamente */
var success = function getLocationSuccess(position) {
  initMap();
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  var location = {
    lat: latitude,
    lng: longitude
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: location
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true,
  });
};

var error = function() {
  alert('Tenemos problemas para encontrar tu ubicación.');
};
function posEvent() {
  localStorage.eventTitle = $modalEventTitle.val();
  localStorage.eventDate = $modalEventDate.val();
  $containerBox.prepend('<div class="card"><div class="card-content"><h4>'+ localStorage.eventTitle +'</h4><p>'+ localStorage.eventDate +'</p><div id="map" class="size-map"></div></div></div>');
  search();
}
  $chatSend.on('click', addPost);
  $imageSend.on('click', postImage);
  $mediaeSend.on('click', postVideo);
  $eventSend.on('click', posEvent);
});
