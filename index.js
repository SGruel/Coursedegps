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

}

function traceGPS(event){
	event.preventDefault();
 formspeed.style.visibility='visible';
}