<?php

namespace AcfDuplicateRepeater\Core;

class Core extends Singleton {

	/**
	 *	Private constructor
	 */
	protected function __construct() {
		add_action( 'plugins_loaded' , array( $this , 'load_textdomain' ) );
		add_action( 'init' , array( $this , 'init' ) );
		add_action( 'wp_enqueue_scripts' , array( $this , 'wp_enqueue_style' ) );

		register_activation_hook( ACF_DUPLICATE_REPEATER_FILE, array( __CLASS__ , 'activate' ) );
		register_deactivation_hook( ACF_DUPLICATE_REPEATER_FILE, array( __CLASS__ , 'deactivate' ) );
		register_uninstall_hook( ACF_DUPLICATE_REPEATER_FILE, array( __CLASS__ , 'uninstall' ) );
		
		parent::__construct();
	}

	/**
	 *	Load frontend styles and scripts
	 *
	 *	@action wp_enqueue_scripts
	 */
	public function wp_enqueue_style() {
	}

	
	/**
	 *	Load text domain
	 * 
	 *  @action plugins_loaded
	 */
	public function load_textdomain() {
		$path = pathinfo( dirname( ACF_DUPLICATE_REPEATER_FILE ), PATHINFO_FILENAME );
		load_plugin_textdomain( 'acf-duplicate-repeater' , false, $path . '/languages' );
	}

	/**
	 *	Init hook.
	 * 
	 *  @action init
	 */
	public function init() {
	}

	/**
	 *	Get asset url for this plugin
	 *
	 *	@param	string	$asset	URL part relative to plugin class
	 *	@return wp_enqueue_editor
	 */
	public function get_asset_url( $asset ) {
		return plugins_url( $asset, ACF_DUPLICATE_REPEATER_FILE );
	}


	/**
	 *	Fired on plugin activation
	 */
	public static function activate() {
	}

	/**
	 *	Fired on plugin deactivation
	 */
	public static function deactivate() {
	}

	/**
	 *	Fired on plugin deinstallation
	 */
	public static function uninstall() {
	}

}
