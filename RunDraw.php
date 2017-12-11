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

    <form  method="get"  id="selectionform"> 
      <fieldset>
       <legend>Input zone</legend>

        <label>Sélectionnez votre course !
         <select id="select" name="course">
           <option value="course1">course1</option>
           <option value="course2">course2</option>
         </select>
        </label>

       <input type="submit" name="Valider" value="Valider" id=valid>
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
