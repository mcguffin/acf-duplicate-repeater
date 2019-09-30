<?php

namespace AcfDuplicateRepeater;

class PluginTest {

	private $current_json_save_path = null;

	public function __construct() {
		add_filter( 'acf/settings/load_json', [ $this, 'load_json' ] );

		add_filter( 'acf/settings/save_json', [ $this, 'save_json' ] );

		add_action( 'acf/delete_field_group', [ $this, 'mutate_field_group' ], 9 );
		add_action( 'acf/trash_field_group', [ $this, 'mutate_field_group' ], 9 );
		add_action( 'acf/untrash_field_group', [ $this, 'mutate_field_group' ], 9 );
		add_action( 'acf/update_field_group', [ $this, 'mutate_field_group' ], 9 );

		add_action( 'init', [ $this, 'init' ] );

		// frontend form
		add_action( 'template_redirect', 'acf_form_head' );
		add_action( 'acf/init', [ $this, 'register_frontend_form' ] );

	}

	/**
	 *	@action init
	 */
	public function init() {
		register_post_type('acf-duprepeat-test',[
			'label'		=> 'Repeater Tests',
			'public'	=> true,
			'supports'	=> ['title'],
		]);

	}

	/**
	 *	@filter 'acf/settings/save_json'
	 */
	public function load_json( $paths ) {
		$paths[] = dirname(__FILE__).'/acf-json';
		return $paths;
	}

	/**
	 *	@filter 'acf/settings/save_json'
	 */
	public function save_json( $path ) {
		if ( ! is_null( $this->current_json_save_path ) ) {
			return $this->current_json_save_path;
		}
		return $path;
	}

	/**
	 *	Figure out where to save ACF JSON
	 *
	 *	@action 'acf/update_field_group'
	 */
	public function mutate_field_group( $field_group ) {
		// default

		if ( strpos( $field_group['key'], 'group_acf_duplicate_repeater_' ) === false ) {
			$this->current_json_save_path = null;
			return;
		}
		$this->current_json_save_path = dirname(__FILE__).'/acf-json';

	}


	/**
	 *	@action acf/init
	 */
	public function register_frontend_form() {

		// same post
		if ( ! function_exists( 'acf_register_form' ) ) {
			return;
		}

		add_shortcode( 'acf-dup-test-form', function( $atts, $content ) {
			ob_start();
			acf_form('acf-dup-test-form');
			return ob_get_clean();
		} );

		acf_register_form( [
			/* (string) Unique identifier for the form. Defaults to 'acf-form' */
			'id'					=> 'acf-dup-test-form',

			/* (int|string) The post ID to load data from and save data to. Defaults to the current post ID.
			Can also be set to 'new_post' to create a new post on submit */
			'post_id'				=> 'new_post',

			/* (array) An array of post data used to create a post. See wp_insert_post for available parameters.
			The above 'post_id' setting must contain a value of 'new_post' */
			'new_post'				=> array(
				'post_title'	=> 'Submitted on ' . date(get_option( 'date_format' ) . ' '.get_option( 'time_format' )),
				'post_type'		=> 'acf-dup-test-sub',
			),

			/* (array) An array of field group IDs/keys to override the fields displayed in this form */
			'field_groups'			=> [
				'group_acf_duplicate_repeater_repeat_tab',
				'group_acf_duplicate_repeater_repeat_relational',
				'group_acf_duplicate_repeater_repeat_jquery',
				'group_acf_duplicate_repeater_repeat_content',
				'group_acf_duplicate_repeater_repeat_choice',
				'group_acf_duplicate_repeater_repeat_basic',
				'group_acf_duplicate_repeater_repeat_acc',
			],

			// /* (array) An array of field IDs/keys to override the fields displayed in this form */
			// 'fields'				=> false,

			/* (boolean) Whether or not to show the post title text field. Defaults to false */
			'post_title'			=> false,

			/* (boolean) Whether or not to show the post content editor field. Defaults to false */
			'post_content'			=> false,

			/* (boolean) Whether or not to create a form element. Useful when a adding to an existing form. Defaults to true */
			'form'					=> true,

			/* (array) An array or HTML attributes for the form element */
			'form_attributes'		=> array(),

			/* (string) The URL to be redirected to after the form is submit. Defaults to the current URL with a GET parameter '?updated=true'.
			A special placeholder '%post_url%' will be converted to post's permalink (handy if creating a new post) */
			'return'				=> '',

			/* (string) Extra HTML to add before the fields */
			'html_before_fields'	=> '',

			/* (string) Extra HTML to add after the fields */
			'html_after_fields'		=> '',

			/* (string) The text displayed on the submit button */
			'submit_value'			=> __("Submit", 'acf'),

			/* (string) A message displayed above the form after being redirected. Can also be set to false for no message */
			'updated_message'		=> __("Post updated", 'acf'),

			/* (string) Determines where field labels are places in relation to fields. Defaults to 'top'.
			Choices of 'top' (Above fields) or 'left' (Beside fields) */
			'label_placement'		=> 'top',

			/* (string) Determines where field instructions are places in relation to fields. Defaults to 'label'.
			Choices of 'label' (Below labels) or 'field' (Below fields) */
			'instruction_placement'	=> 'label',

			/* (string) Determines element used to wrap a field. Defaults to 'div'
			Choices of 'div', 'tr', 'td', 'ul', 'ol', 'dl' */
			'field_el'				=> 'div',

			/* (string) Whether to use the WP uploader or a basic input for image and file fields. Defaults to 'wp'
			Choices of 'wp' or 'basic'. Added in v5.2.4 */
			'uploader'				=> 'wp',

			/* (boolean) Whether to include a hidden input field to capture non human form submission. Defaults to true. Added in v5.3.4 */
			'honeypot'				=> true,

			/* (string) HTML used to render the updated message. Added in v5.5.10 */
			'html_updated_message'	=> '<div id="message" class="updated"><p>%s</p></div>',

			/* (string) HTML used to render the submit button. Added in v5.5.10 */
			'html_submit_button'	=> '<input type="submit" class="acf-button button button-primary button-large" value="%s" />',

			/* (string) HTML used to render the submit button loading spinner. Added in v5.5.10 */
			'html_submit_spinner'	=> '<span class="acf-spinner"></span>',

			/* (boolean) Whether or not to sanitize all $_POST data with the wp_kses_post() function. Defaults to true. Added in v5.6.5 */
			'kses'					=> true
		]);

	}

}

new PluginTest();
