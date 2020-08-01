
<?php
function getData(){
    $url = "https://donnees.roulez-eco.fr/opendata/instantane"; 
    if(file_put_contents( "data.zip" ,file_get_contents($url))) { 
    $zip = new ZipArchive;
    $out = $zip->open("./data.zip");
    if ($out === TRUE) {
        $zip->extractTo('./extract/');
        $zip->close();
        } else {
        echo 'doh!';
        } 
    } 
    else { 
        echo "File downloading failed."; 
    } 

}


//$xml = simplexml_load_file('./extract/PrixCarburants_instantane.xml');


// afficher all services
// foreach ($xml->pdv[1]->services->service as $serv) {
//   echo '<li>'.$serv.'</li>';
// };

// afficher all prix
// $pcount =  $xml->pdv[1]->prix->count();
// for ($i=0; $i<$pcount; $i++ ) {
//   echo('<li>'.$xml->pdv[1]->prix[$i]['nom'].'</li>');
// }
?>
