<?php

$team = $_GET["team"];
$coach = $_GET["coach"];

$pdo = new PDO("mysql:host=mysql.caesar.elte.hu;dbname=kingbrady;charset=utf8", "kingbrady", "aNbfGsQP0xKF0eY6"); // TODO: pwd from file

$query = "SELECT coach FROM away_coaches WHERE team='" . $team ."'";
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $pdo->prepare($query);
$stmt->execute([]);
$response = $stmt->fetchAll();
$sql = "";

if (!empty($response)) {
    $sql = "UPDATE `away_coaches` SET `coach`=:coach WHERE team=:team";
} else {
    $sql = "INSERT INTO `away_coaches`(`team`, `coach`) VALUES (:team, :coach)";
}

$params = ["team" => $team, "coach" => $coach];
$pdo->prepare($sql)->execute($params);

?>