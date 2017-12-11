<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
    <link rel="stylesheet" href="RunDraw.css">
    <script src="index.js"></script>
  </head>
  <body>
    <div id="container">
      <div id="map">
      </div>
    </div>

    <form  method="post"  id='test'> 
      <fieldset>
       <legend>Input zone</legend>

        <label>Sélectionnez votre course !
         <select id="select" name="course">
           <option value="../json/simple-activity_1995509180.json">course1</option>
           <option value="../json/simple-activity_2092979987.json">course2</option>
         </select>
        </label>

       <button id="valid" >Valider</button>
     </fieldset> 
    </form>
    <div id='speeddiv'>
      <form  method="get" id="formspeed">
        <fieldset>
          <legend>Your stats</legend>
          <p><input type = "submit" name="Play" value="Play" id ='buttonspeed'></p>
          <label>Vitesse <input type = "checkbox" name = "Vitesse" id='speedbox'></label>
        </fieldset>
      </form>
    </div>


  </body>

</html>
