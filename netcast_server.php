<?php

include_once('tbs_class.php'); 
include_once('tbs_plugin_opentbs.php');

if (version_compare(PHP_VERSION,'5.1.0')>=0) {
	if (ini_get('date.timezone')=='') {
		date_default_timezone_set('UTC');
	}
}

$TBS = new clsTinyButStrong; 
$TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN);


$gendergroup = $_GET["group_input_field"] ?? "{csoport}";
$roundofplay = $_GET["round_input_field"] ?? "{forduló}";
$hometeam = $_GET["hometeam"];
$awayteam = $_GET["awayteam"];
$homescore = $_GET["homescore"];
$awayscore = $_GET["awayscore"];
$quarterscore = $_GET["quarterscore"];
$city = $_GET["location_input_field"] ?? "{helyszín}";
$court = "TODO: court";
$fansnum = $_GET["fans_input_field"] ?? "{nézőszám}";
$referees = isset($_GET["ref1_input_field"]) && $_GET["ref2_input_field"] ? ($_GET["ref1_input_field"] . ", " .$_GET["ref2_input_field"]) : "{játékvezetők}";
// TODO: játékvezetők
$homestarters = $_GET["homestarters"];
$awaystarters = $_GET["awaystarters"];
$homebench = $_GET["homebench"];
$awaybench = $_GET["awaybench"];
$homecoach = $_GET["home_coach_input_field"] ?? "{edzőnév}";
$awaycoach = $_GET["away_coach_input_field"] ?? "{edzőnév}";

$template = 'tudositas_sablon.docx';
$TBS->LoadTemplate($template, OPENTBS_ALREADY_UTF8); 

// $save_as = (isset($_POST['save_as']) && (trim($_POST['save_as'])!=='') && ($_SERVER['SERVER_NAME']=='localhost')) ? trim($_POST['save_as']) : '';
$output_file_name = "tudositas_generated.docx";
$TBS->Show(OPENTBS_DOWNLOAD, $output_file_name);
exit();
?>