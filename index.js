// déclaration des variable
var map;
var selectionform;
var speed;
var formspeed;
var speedbox;
var buttonspeed;
var valid;


// variable globale
var valid = document.getElementById('valid')
var formspeed = document.getElementById('formspeed')
//initialisation de la page
window.onload =init;






function init(){

   // initialisation des variables
   var map = L.map('map').setView([51.505, -0.09], 13);
   var formspeed = document.getElementById('formspeed')

   var valid = document.getElementById('valid')
   var request= new XMLHttpRequest()

   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);
   // cache du formulaire des vitesses
   formspeed.style.visibility='hidden';







   valid.addEventListener('click',traceGPS);

};

// affichage de la course + formulaire des vitesses



function traceGPS(){
  formspeed.style.visibility='visible';
};

function  Goajax(ajax){
  if  (ajax.readyState ==4 && ajax.status ==200){
    console.log('prout' )
  };
};
function trace_polyligne(listCoord){

};
