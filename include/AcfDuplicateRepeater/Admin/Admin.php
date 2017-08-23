<?php

namespace AcfDuplicateRepeater\Admin;
use AcfDuplicateRepeater\Core;


class Admin extends Core\Singleton {

	private $core;

	/**
	 *	Private constructor
	 */
	protected function __construct() {

		$this->core = Core\Core::instance();

		add_action( 'after_setup_theme' , array( $this , 'setup' ) );
	}

	/**
	 * Setup plugin
	 *
	 * @action plugins_loaded
	 */
	public function setup() {

		if ( class_exists( 'acf' ) && function_exists( 'acf_get_field_groups' ) ) {

			// enqueue assets
			add_action( 'load-post.php' , array( $this, 'enqueue_assets' ) );

		} else if ( class_exists( 'acf' ) && current_user_can( 'activate_plugins' ) ) {

			// say something about incompatibility
			add_action( 'admin_notices', array( $this, 'print_acf_free_notice' ) );

		}
	}

	/**
	 * @action admin_notices
	 */
	function print_acf_free_notice() {
		?>
		<div class="notice notice-error is-dismissible">
			<p><?php 
				printf( 
					_x( 'The ACF QuickEdit Fields plugin only provies support for <a href="%1$s">ACF Pro</a>. You can disable and uninstall it on the <a href="%2$s">plugins page</a>.', 
						'1: ACF Pro URL, 2: plugins page url',
						'acf-quick-edit-fields' 
					),
					'http://www.advancedcustomfields.com/pro/',
					admin_url('plugins.php' )
					
				); 
			?></p>
		</div>
		<?php
	}

	/**
	 * @action 'load-post.php'
	 */
	function enqueue_assets() {

		wp_enqueue_style( 'acf-repeater-duplicate-admin' , $this->core->get_asset_url( '/css/admin/repeater-duplicate.css' ), array('acf-pro-input') );

		wp_enqueue_script( 'acf-repeater-duplicate-admin' , $this->core->get_asset_url( 'js/admin/repeater-duplicate.js' ), array('acf-pro-input') );
		wp_localize_script('acf-repeater-duplicate-admin' , 'acf_duplicate_repeater' , array(
			'options'	=> array(
				'duplicate_btn'	=> sprintf(
					'<a class="acf-icon -copy small acf-js-tooltip" href="#" data-event="duplicate-row" title="%s"></a>',
					__('Duplicate Entry', 'acf-duplicate-repeater' )
					),
			),
			'l10n'		=> array(
			),
		) );

	}

	/**
	 * Admin init
	 */
	function admin_init() {
	}


}

