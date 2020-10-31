<?php
    header("Access-Control-Allow-Origin: *"); 

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "http://hunbasket.hu/musor/" . date("Y-m-d"));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $output = curl_exec($ch);
    var_dump($output);

    curl_close($ch);     
?>