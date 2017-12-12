<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>course</title>
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

    <div>
     <form id="test">
       <fieldset>
        <legend>Input zone</legend>

         <label>Sélectionnez votre course !
          <select id="select" name="course">
            <option value="./json/simple-activity_1995509180.json">course1</option>
            <option value="./json/simple-activity_2092979987.json">course2</option>
          </select>
         </label>

        <input type="submit" id="valid" value="valider">
      </fieldset>
     </form>
   </div>
   <h1 id='Titlerun'></h1>
   <p id='coord'></p>

    <div id='speeddiv'>
      <form  method="get" id="formspeed">
        <fieldset>
          <legend>Your stats</legend>
          <p><input type = "submit" name="Play" value="Play" id ='buttonspeed'></p>
          <label>Vitesse <input type = "checkbox" name = "Vitesse" id='speedbox'></label>
        </fieldset>
      </form>
    </div>

    <div id="partie3">
      <form action="RunDraw.php" enctype="multipart/form-data" method="post">

        <br><input type="file" name="course" multiple="multiple"></br>
        <input type="hidden" name="MAX_FILE_SIZE" value="1048576">
        <input type="submit" value="Envoyer">
      </form>
      <!-- récupération des données du formulaire -->
      <?php
      $_FILES ['course']['name'];     //Le nom original du fichier
      $_FILES['course']['type'] ;     //Le type du fichier '.gpx'
      $_FILES['course']['size'];      //La taille du fichier en octets
      $_FILES['course']['tmp_name'] ; //L'adresse vers le fichier uploadé dans le répertoire temporaire
      $_FILES['course']['error'] ;    //Le code d'erreur, permet de savoir si le fichier a bien été uploadé
      ?>

      <!-- On vérifie si le fichier a bien été uploadé -->
      <?php
      //est-ce qu'il y a une erreur ?
      if ($_FILES['course']['error'] > 0) $erreur = "Erreur lors du transfert";
      if ($_FILES['course']['error'] > 0) echo($erreur);

      //taille
      $maxsize = $_POST["MAX_FILE_SIZE"];
      if ($_FILES['course']['size'] > $maxsize) $erreur_taille = "Le fichier est trop gros";
      if ($_FILES['course']['size'] > $maxsize) echo($erreur_taille);

      //type
      $extensions_valides = array('gpx');
      //strrchr renvoit l'extension avec le point (".")
      //substr(chaine,1) ignore le premier caractere de la chaine
      //strtolower met l'extension en minuscules
      $extension_upload = strtolower( substr( strrchr($_FILES['course']['name'],'.') ,1) );
      if ( in_array($extension_upload,$extensions_valides) ) echo "Extension correcte";
       ?>

       <!-- Déplacement du fichier -->
       <?php
       $target_directory = './json/';
       $target_file = $target_directory . basename($_FILES["course"]["name"]);
       $resultat = move_uploaded_file($_FILES['course']['tmp_name'],$target_file);
       if ($resultat) echo ('Transfert réussi');
       ?>

       <!-- encodage en json -->
       <?php
       $gpx = simplexml_load_file($target_file);
       $json = json_encode($gpx);
       ?>

       <!-- création en sauvegarde du fichier json -->
       <?php
       // Nom du fichier à créer
       $nom_du_fichier = $target_directory .basename('tmp.json');
       //echo($nom_du_fichier);
       // Ouverture du fichier
       $fichier = fopen($nom_du_fichier, 'w+');
       // Ecriture dans le fichier
       fwrite($fichier, $json);
       // Fermeture du fichier
       fclose($fichier);
       ?>

       <!-- On renomme le fichier json avec le bon nom et on le met dans le bon format-->
       <?php
       $json_tmp = file_get_contents($nom_du_fichier);
       $parsed_json = json_decode($json_tmp);
       $filename = $parsed_json->{'trk'}->{'name'};
       $content = '{"name":"'.$filename.'","points":[';
       $trkpt = $parsed_json->{'trk'}->{'trkseg'}->{'trkpt'};
       for($i= 0; $i < count($trkpt); $i++){
         $lat = $trkpt[$i]->{'@attributes'}->{'lat'};
         $lgt = $trkpt[$i]->{'@attributes'}->{'lgt'};
         $ele = $trkpt[$i]->{'ele'};
         $time= $trkpt[$i]->{'time'};
         if ($i == count($trkpt)-1){
            $content.='{"lat":"'.$lat.'","lng":"'.$lgt.'","ele":"'.$ele.'","time":"'.$time.'"}]}';
         }
         else{
            $content.='{"lat":"'.$lat.'","lng":"'.$lgt.'","ele":"'.$ele.'","time":"'.$time.'"},';
         }
       }

       $fichier = fopen($nom_du_fichier, 'w+');
       // Ecriture dans le fichier
       fwrite($fichier, $content);
       // Fermeture du fichier
       fclose($fichier);
       $extension = '.json';
       rename($nom_du_fichier,$target_directory.basename($filename . $extension));
       ?>

       <!-- suppression du gpx -->
       <?php
       unlink($target_file);
        ?>

        <!-- rajout d'une ligne dans le csv -->
        <?php
        $file = fopen('./json/metadata.csv','a+');
        $ligne = basename($filename,$extension).'.json;'.' '.$filename;
        $fields = array($ligne);
        fputcsv ( $file , $fields);
        fclose($file);
         ?>
    </div>

  </body>

</html>
