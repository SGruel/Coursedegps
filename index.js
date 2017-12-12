



//initialisation de la page
window.onload = init;

function init(){

   // initialisation des variables

   var valid=document.getElementById('valid');
   var map = L.map('map').setView([51.505, -0.09], 13);
   var formspeed = document.getElementById('formspeed');
   var selectionform= document.getElementById("test");


   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);
   // cache du formulaire des vitesses
   formspeed.style.visibility='hidden';
   selectionform.addEventListener('submit',traceGPS);
   function traceGPS(){
     var ajax_gps = new XMLHttpRequest();

     var url;
     
     formspeed.style.visibility='visible';
   };



   function tracepolyligne(listeCoord,map){

   }




};
