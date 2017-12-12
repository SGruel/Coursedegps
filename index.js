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
     e.preventDefault();
     var select = document.getElementById('select');

     var ajax_gps = new XMLHttpRequest();
     ajax_gps.addEventListener('readystatechange',function(){
       traceAjax(ajax_gps);
     });

     recupfile(ajax_gps);


   };


   function traceAjax(ajax) {
     if (ajax.readyState ==4 && ajax.status  ==200){
       formspeed.style.visibility = 'visible';
       var file = JSON.parse(ajax.responseText)
       alert(file.points)
     }


   }

   function recupfile(ajax) {
     ajax.open("GET",select.value);
     ajax.send();
   }



   function tracepolyligne(listeCoord){

   }



}

function traceGPS(event){
	event.preventDefault();
 formspeed.style.visibility='visible';
}
