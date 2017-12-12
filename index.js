//initialisation de la page
window.onload = init;



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


       // centrage de la map sur le premier point de la course + marqueur
       var marker = new L.marker([file.points[0].lat,file.points[0].lng])
       map.addLayer(marker)
       map.setView([file.points[0].lat,file.points[0].lng],13)
       var coord = document.getElementById('coord')
       coord.innerHTML = "Latitude :  "+file.points[0].lat+"   Longitude :   "+file.points[1].lat


       //creation de la polyligne
       var polylignePoints = new Array();
       var dateini = Date.parse(file.points[0].time)

       //boucle sur les points du json +modifications des temps
       for(var point in file.points){
         polylignePoints.push( new L.LatLng(file.points[point].lat,file.points[point].lng));
         file.points[point].time= dateini-Date.parse(file.points[point].time)
       };
       var polyligneOptions= {
         color : 'red',
         weight : 2 ,
         opacity : 0.9 ,

       };
       var polyligne = new L.Polyline(polylignePoints,polyligneOptions);
       //ajout de la polyligne à la carte et centrage sur celle ci
       map.addLayer(polyligne);
       map.fitBounds(polyligne.getBounds());
       // ajout du titre
       var titre =document.getElementById('Titlerun')
       titre.innerHTML= file.name
     }


   }



   function recupfile(ajax) {
     ajax.open("GET",select.value);
     ajax.send();
   }

   // gestion  pour  vitesse
   





}
