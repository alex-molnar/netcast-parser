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

$gendergroup = "{csoport}";
$roundofplay = "{forduló}";
$hometeam = $_GET["hometeam"];
$awayteam = $_GET["awayteam"];
$homescore = $_GET["homescore"];
$awayscore = $_GET["awayscore"];
$quarterscore = $_GET["quarterscore"];
$city = "{város}";
$court = "{helyszín}";
$fansnum = "{nézőszám}";
$referees = "{játékvezetők}";
$homestarters = $_GET["homestarters"];
$awaystarters = $_GET["awaystarters"];
$homebench = $_GET["homebench"];
$awaybench = $_GET["awaybench"];
$homecoach = "{edzőnév}";
$awaycoach = "{edzőnév}";

$template = 'tudositas_sablon.odt';
$TBS->LoadTemplate($template, OPENTBS_ALREADY_UTF8); 

// $save_as = (isset($_POST['save_as']) && (trim($_POST['save_as'])!=='') && ($_SERVER['SERVER_NAME']=='localhost')) ? trim($_POST['save_as']) : '';
$output_file_name = "tudositas_generated.odt";
$TBS->Show(OPENTBS_DOWNLOAD, $output_file_name);
exit();
?>
