import $ from 'jquery';
import { extendACF } from 'acf-extend.js';
import { copyValues } from 'acf-values.js';

const options = acf_duplicate_repeater.options;

extendACF( 'FlexibleContentField', {
	events: {
		'click [data-name="duplicate-layout"]': '_duplicate'
	},
	render: function() {

		var ret;

		ret = this.parent.render.apply( this, arguments );

		// add duplicate btn
		this.$layouts().each(function( i, el ){
			if ( ! $(this).find('[data-name="duplicate-layout"]').length ) {
				$(this).find('.acf-fc-layout-controls').prepend( options.duplicate_flexible_btn );
			}
		});

		return ret;
	},
	_duplicate: function( e ) {

		var layout,
			duplicatedEvent,
			$field,
			$layout,  // original field
			$new_layout; // cloned field

		// get layout wrapper
		$layout = $(e.target).closest('.layout');

		// get flexible_content field
		$field = $layout.closest('.acf-field');

		// acf set field contenxt
		//acf.fields.flexible_content.set( '$field', $field );

		// acf add target layout before source layout
		$new_layout = this.add( {
			layout: $layout.data('layout'),
			before: $layout,
		});

		if ( ! $new_layout ) {
			return;
		}
		// get the added layout
//		$new_layout = $layout.prev( '.layout' );
		$new_layout.addClass('_duplicated');

		// copy values from source layout to destination
		copyValues( $layout, $new_layout, '> .acf-table > tbody > .acf-row > .acf-field, > .acf-fields > .acf-field' ); // exclude clones!

		setTimeout(function(){
			$new_layout.removeClass('_duplicated');
		}, 125 );

		duplicatedEvent = $.Event( 'acf_duplicated_layout' );
		duplicatedEvent.destination = $new_layout;

		$layout.trigger( duplicatedEvent );
	}
} );
//module.exports = {};
