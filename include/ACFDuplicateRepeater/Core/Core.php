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
	private $style_asset = null;

	/**
	 *	@var Asset\Asset
	 */
	private $script_asset = null;


	/**
	 *	@inheritdoc
	 */
	protected function __construct() {

		add_action( 'after_setup_theme' , [ $this , 'setup' ] ); // Y ! admin_init?

		add_action( 'acf_enqueue_scripts' , [ $this , 'enqueue_assets' ] );

		$args = func_get_args();
		parent::__construct( ...$args );
	}


	/**
	 *	Setup plugin
	 *
	 *	@action after_setup_theme
	 */
	public function setup() {

		if ( class_exists( 'acf_pro' ) && version_compare( acf()->version, '5.9.0', '>=' ) ) {

			// say something about incompatibility
			add_action( 'admin_notices', [ $this, 'print_deprecation_notice' ] );

		} else if ( class_exists( 'acf_pro' ) && version_compare( acf()->version, '5.7.0', '>=' ) ) {

			// enqueue assets
			add_action( 'acf/input/admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
			add_action( 'init', [ $this, 'register_assets' ] );

		} else if ( current_user_can( 'activate_plugins' ) ) {

			// say something about incompatibility
			add_action( 'admin_notices', [ $this, 'print_acf_notice' ] );

		}
	}

	/**
	 * @action admin_notices
	 */
	function print_acf_notice() {
		$message = sprintf(
			/* Translators: ACF-Pro URL */
			__(
				'The ACF Duplicate Repeater plugin only provides support for <a href="%s" target="_blank" rel="noopener noreferrer">ACF Pro 5.7</a> and up.',
				'acf-duplicate-repeater'
			),
			'https://www.advancedcustomfields.com/pro'
		);
		if ( class_exists( 'acf_pro' ) && version_compare( acf()->version, '5.7.0', '<' ) ) {
			$message .= ' ' . sprintf(
				/* Translators: Plugins page URL */
				__(
					'Please upgrade ACF Pro to the latest Version on the <a href="%s">plugins page</a>.',
					'acf-duplicate-repeater'
				),
				admin_url('plugins.php' )
			);
		} else {
			$message .= ' ' . sprintf(
				/* Translators: Plugins page URL */
				__(
					'You can disable and uninstall the plugin on the <a href="%1$s">plugins page</a>.',
					'acf-duplicate-repeater'
				),
				admin_url('plugins.php' )
			);
		}
		?>
		<div class="notice notice-error is-dismissible">
			<p>
				<?php echo wp_kses( $message, [ 'a' => [ 'rel' => [], 'href' => [], 'target' => [] ] ] ); ?>
			</p>
		</div>
		<?php
	}


	/**
	 * @action admin_notices
	 */
	function print_deprecation_notice() {
		$message = __(
			'ACF Pro 5.9 comes with a duplicate row feature on its own. You don‘t need the “ACF Duplicate Repeater” any more.',
			'acf-duplicate-repeater'
		);
		if ( current_user_can( 'install_plugins' ) ) {
			$message .= ' ' . sprintf(
				/* Translators: Plugins page URL */
				__(
					'You can disable and uninstall the plugin on the <a href="%1$s">plugins page</a>.',
					'acf-duplicate-repeater'
				),
				admin_url( 'plugins.php' )
			);
		}
		?>
		<div class="notice notice-error">
			<p>
				<strong><?php esc_html_e( 'A notice from the ACF Duplicate Repeater plugin:', 'acf-duplicate-repeater' ); ?></strong>
				<?php echo wp_kses( $message, [ 'a' => [ 'rel' => [], 'href' => [], 'target' => [] ] ] ); ?>
			</p>
		</div>
		<?php

	}


	/**
	 *	Load frontend styles and scripts
	 *
	 *	@action wp_enqueue_scripts
	 */
	public function register_assets() {

		// style asset
		$this->style_asset = Asset\Asset::get('css/acf/duplicate-repeater.css')
			->deps( ['acf-pro-input'] );



		$this->script_asset = Asset\Asset::get( 'js/acf/duplicate-repeater.js' )
			->footer( false )
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
			], 'acf_duplicate_repeater' );

	}

	/**
	 *	Load frontend styles and scripts
	 *
	 *	@action wp_enqueue_scripts
	 */
	public function enqueue_assets() {
		if ( is_null( $this->style_asset ) ) {
			$this->register_assets();
		}
		$this->style_asset->enqueue();
		$this->script_asset->enqueue();
	}


}
