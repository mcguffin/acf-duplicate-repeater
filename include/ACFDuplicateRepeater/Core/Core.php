<?php
/**
 *	@package ACFDuplicateRepeater\Core
 *	@version 1.0.1
 *	2018-09-22
 */

namespace ACFDuplicateRepeater\Core;

if ( ! defined('ABSPATH') ) {
	die('FU!');
}
use ACFDuplicateRepeater\Asset;

class Core extends Plugin implements CoreInterface {

	/**
	 *	@var Asset\Asset
	 */
	private $style_asset;

	/**
	 *	@var Asset\Asset
	 */
	private $script_asset;


	/**
	 *	@inheritdoc
	 */
	protected function __construct() {

		add_action( 'init' , array( $this , 'init' ) );

		add_action( 'after_setup_theme' , array( $this , 'setup' ) ); // Y ! admin_init?

		add_action( 'wp_enqueue_scripts' , array( $this , 'enqueue_assets' ) );

		$args = func_get_args();
		parent::__construct( ...$args );
	}


	/**
	 *	Setup plugin
	 *
	 *	@action after_setup_theme
	 */
	public function setup() {

		if ( class_exists( 'acf' ) && function_exists( 'acf_get_field_groups' ) ) {

			// enqueue assets
			add_action( 'acf/input/admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
			add_action( 'init' , array( $this , 'register_assets' ) );

		} else if ( ! class_exists( 'acf' ) && current_user_can( 'activate_plugins' ) ) {

			// say something about incompatibility
			add_action( 'admin_notices', array( $this, 'print_acf_notice' ) );

		}
	}

	/**
	 *	Load frontend styles and scripts
	 *
	 *	@action wp_enqueue_scripts
	 */
	public function register_assets() {

		// style asset
		$this->style_asset = Asset\Asset::get('css/admin/repeater-duplicate.css')
			->deps( ['acf-pro-input'] );


		if ( version_compare( acf()->version, '5.7.0', '>=' ) ) {
			$script_src = "js/admin/repeater-duplicate.js";
		} else {
			$script_src = "js/legacy/5.6/admin/repeater-duplicate.js";
		}

		$this->script_asset = Asset\Asset::get( $script_src )
			->deps( ['acf-pro-input'] )
			->localize( [
				'options'	=> [
					'duplicate_repeater_btn' => sprintf(
						'<a class="acf-icon -copy small acf-js-tooltip" href="#" data-event="duplicate-row" title="%s"></a>',
						__('Duplicate Entry', 'acf-duplicate-repeater' )
						),
					'duplicate_flexible_btn' => sprintf(
						'<a class="acf-icon -copy small light acf-js-tooltip" href="#" data-name="duplicate-layout" title="%s"></a>',
						__('Duplicate Layout', 'acf-duplicate-repeater' )
						),
				],
				'l10n'		=> [],
			] );

	}

	/**
	 *	Load frontend styles and scripts
	 *
	 *	@action wp_enqueue_scripts
	 */
	public function enqueue_assets() {
		$this->style_asset->enqueue();
		$this->script_asset->enqueue();

		Asset\Asset::get( 'css/main.css' )->enqueue();
		Asset\Asset::get( 'js/main.js' )
			->deps( ['jquery'] )
			->localize( array(
				/* Script localization */
			) )
			->enqueue();
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
	 *	@return string URL
	 */
	public function get_asset_url( $asset ) {
		return plugins_url( $asset, $this->get_plugin_file() );
	}


	/**
	 *	Get asset url for this plugin
	 *
	 *	@param	string	$asset	URL part relative to plugin class
	 *	@return string URL
	 */
	public function get_asset_path( $asset ) {
		return $this->get_plugin_dir() . '/' . preg_replace( '/^(\/+)/', '', $asset );
	}


}
