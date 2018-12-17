<?php

namespace AcfDuplicateRepeater\Core;

class Core extends Plugin {

	/**
	 *	Private constructor
	 */
	protected function __construct() {
		add_action( 'plugins_loaded' , array( $this , 'load_textdomain' ) );

		add_action( 'after_setup_theme' , array( $this , 'setup' ) ); // Y ! admin_init?

		register_activation_hook( ACF_DUPLICATE_REPEATER_FILE, array( __CLASS__ , 'activate' ) );
		register_deactivation_hook( ACF_DUPLICATE_REPEATER_FILE, array( __CLASS__ , 'deactivate' ) );
		register_uninstall_hook( ACF_DUPLICATE_REPEATER_FILE, array( __CLASS__ , 'uninstall' ) );

		parent::__construct();
	}

	/**
	 * Setup plugin
	 *
	 * @action plugins_loaded
	 */
	public function setup() {

		if ( class_exists( 'acf' ) && function_exists( 'acf_get_field_groups' ) ) {

			// enqueue assets
			add_action( 'acf/input/admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
			add_action( 'init' , array( $this , 'register_scripts' ) );

		} else if ( ! class_exists( 'acf' ) && current_user_can( 'activate_plugins' ) ) {

			// say something about incompatibility
			add_action( 'admin_notices', array( $this, 'print_acf_notice' ) );

		}
	}

	/**
	 * @action admin_notices
	 */
	function print_acf_notice() {
		?>
		<div class="notice notice-error is-dismissible">
			<p><?php
				printf(
					_x( 'The ACF Duplicate Repeater plugin only provies support for <a href="%1$s">ACF 5+</a>. You can disable and uninstall it on the <a href="%2$s">plugins page</a>.',
						'1: ACF URL, 2: plugins page url',
						'acf-quick-edit-fields'
					),
					'http://www.advancedcustomfields.com/',
					admin_url('plugins.php' )

				);
			?></p>
		</div>
		<?php
	}

	/**
	 * @action acf/input/admin_enqueue_scripts
	 */
	function enqueue_assets() {

		wp_enqueue_style( 'acf-repeater-duplicate-admin' );

		wp_enqueue_script( 'acf-repeater-duplicate-admin' );

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
	public function register_scripts() {
		wp_register_style( 'acf-repeater-duplicate-admin' , $this->get_asset_url( '/css/admin/repeater-duplicate.css' ), array('acf-pro-input') );

		$suffix = ( defined('SCHRIPT_DEBUG') && SCHRIPT_DEBUG ) ? '' : '.min';

		if ( version_compare( acf()->version, '5.7.0', '>=' ) ) {
			$script_src = "js/admin/repeater-duplicate{$suffix}.js";
		} else {
			$script_src = "js/legacy/5.6/admin/repeater-duplicate{$suffix}.js";
		}

		wp_register_script( 'acf-repeater-duplicate-admin' , $this->get_asset_url( $script_src ), array('acf-pro-input') );

		wp_localize_script('acf-repeater-duplicate-admin' , 'acf_duplicate_repeater' , array(
			'options'	=> array(
				'duplicate_repeater_btn' => sprintf(
					'<a class="acf-icon -copy small acf-js-tooltip" href="#" data-event="duplicate-row" title="%s"></a>',
					__('Duplicate Entry', 'acf-duplicate-repeater' )
					),
				'duplicate_flexible_btn' => sprintf(
					'<a class="acf-icon -copy small light acf-js-tooltip" href="#" data-name="duplicate-layout" title="%s"></a>',
					__('Duplicate Layout', 'acf-duplicate-repeater' )
					),
			),
			'l10n'		=> array(
			),
		) );
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
