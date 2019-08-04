<?php



add_filter('acf/settings/load_json',function($paths){
	$paths[] = dirname(__FILE__).'/acf-json';
	return $paths;
});
