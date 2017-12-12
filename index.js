//initialisation de la page
window.onload = init;

var selectionform = document.getElementById("test");
var formspeed = document.getElementById("speeddiv");

function init(){

   // initialisation des variables
   selectionform = document.getElementById("test");
	formspeed = document.getElementById("speeddiv");

   var valid=document.getElementById('valid');
   var map = L.map('map').setView([51.505, -0.09], 13);

   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   // cache du formulaire des vitesses
   formspeed.style.visibility='hidden';
   selectionform.addEventListener('submit',traceGPS);
   function traceGPS(e){
     // on empeche le rechargement de la page
     e.preventDefault();
     // on récupère le fichier choisi
     var select = document.getElementById('select');
     // séquence ajax pour obtenir le json et tracer sur la carte
     var ajax_gps = new XMLHttpRequest();
     ajax_gps.addEventListener('readystatechange',function(){
       traceAjax(ajax_gps);
     });

     recupfile(ajax_gps);


   };


   function traceAjax(ajax) {
     if (ajax.readyState ==4 && ajax.status  ==200){
       // affichage du formulaire des vitesses
       formspeed.style.visibility = 'visible';
       // récupération du json
       var file = JSON.parse(ajax.responseText);
       // centrage de la map sur le premier point de la course
       map.setView([file.points[0].lat,file.points[0].lng],13)
       //creation de la polyligne
       var polylignePoints = new Array();
       //boucle sur les points du json
       for(var point in file.points){
         polylignePoints.push( new L.LatLng(file.points[point].lat,file.points[point].lng))

       };
       var polyligneOptions= {
         color : 'red',
         weight : 4 ,
         opacity : 0.9 ,

       };
       var polyligne = new L.Polyline(polylignePoints,polyligneOptions);
       map.addLayer(polyligne);
       map.fitBounds(polyligne.getBounds());

     }


   }

   function recupfile(ajax) {
     ajax.open("GET",select.value);
     ajax.send();
   }







}

function traceGPS(event){
	event.preventDefault();
 formspeed.style.visibility='visible';
}
