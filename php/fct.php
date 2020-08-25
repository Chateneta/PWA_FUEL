<?php

if(!empty($_SERVER["REQUEST_METHOD"] == "GET")){
    $url = "https://donnees.roulez-eco.fr/opendata/instantane"; 
    if(file_put_contents( "../data.zip" ,file_get_contents($url))) { 
    $zip = new ZipArchive;
    $out = $zip->open("../data.zip");
    if ($out === TRUE) {
        $zip->extractTo('../extract/');
        echo "Donnée à jours.";
        $zip->close();
        } else {
        echo "Une erreur c'est produit";
        } 
    } 
    else { 
        echo "Une erreur c'est produit"; 
    } 
}
?>