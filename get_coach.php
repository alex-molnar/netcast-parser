<?php 
header("Access-Control-Allow-Origin: *"); 

$sql = "SELECT coach FROM away_coaches WHERE team='" . $_GET["team"] ."'";

$pdo = new PDO("mysql:host=mysql.caesar.elte.hu;dbname=kingbrady;charset=utf8", "kingbrady", "aNbfGsQP0xKF0eY6"); // TODO: pwd from file
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->prepare($sql);
$stmt->execute([]);
$response = $stmt->fetchAll();

header('Content-Type: application/json');
if (!empty($response)) {
    echo json_encode($response[0]);
}
else {
    echo "{}";
}

?>