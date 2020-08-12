
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
