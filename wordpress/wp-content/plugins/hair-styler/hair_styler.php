<?php
/*
Plugin Name: Hair Styler
Plugin URI: 
Description: 
Author: Ben Miller, Fabian Rastorfer
Version: 0.1
Author URI: 
*/

register_activation_hook(__FILE__, 'hair_styler_activate');
register_deactivation_hook(__FILE__, 'hair_styler_deactivate');

function hair_styler_activate() {
	require_once dirname(__FILE__).'/hair_styler_loader.php';
	$loader = new HairStylerLoader();
	$loader->activate();
}

function hair_styler_deactivate() {
	require_once dirname(__FILE__).'/hair_styler_loader.php';
	$loader = new HairStylerLoader();
	$loader->deactivate();
}

?>