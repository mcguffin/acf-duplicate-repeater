<?php

/*
Plugin Name: ACF Duplicate Repeater
Plugin URI: https://github.com/mcguffin/acf-duplicate-repeater
Description: Duplicate Repeater and Layout Fields in ACF Pro
Author: Jörn Lund
Version: 2.0.6
Author URI: https://github.com/mcguffin
License: GPL3
Text Domain: acf-duplicate-repeater
Domain Path: /languages/
*/

/*  Copyright 2018  Jörn Lund

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/*
Plugin was generated with Jörn Lund's WP Skelton
https://github.com/mcguffin/wp-skeleton
*/


namespace ACFDuplicateRepeater;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}

require_once __DIR__ . DIRECTORY_SEPARATOR . 'include/autoload.php';

Core\Core::instance( __FILE__ );
