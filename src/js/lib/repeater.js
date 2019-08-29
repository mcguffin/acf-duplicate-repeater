import $ from 'jquery';
import { extendACF } from 'acf-extend.js';
import { copyValues } from 'acf-values.js';

const options = acf_duplicate_repeater.options;

/**
 *	Extend acf flexible content field
 */
extendACF( 'RepeaterField', {
	events: {
		'click a[data-event="duplicate-row"]': '_duplicate'
	},
	render: function() {

		var ret;

		ret = this.parent.render.apply( this, arguments );

		// add duplicate btn
		this.$rows().each( ( i, el ) => {
			if ( ! $(el).find('[data-event="duplicate-row"]').length ) {
				$(el).find('> td.remove').append( options.duplicate_repeater_btn );
			}
		});

		return ret;
	},
	_duplicate: function( e ) {

		var $source, $dest, duplicatedEvent;
		// get source row
		if( $(e.target).hasClass('acf-icon') ) {
			$source = $(e.target).closest('.acf-row');
		} else {
			return;
		}
		// add destination row
		$dest = this.add( { before: $source } ); // add before source!
		if ( ! $dest ) {
			return;
		}
		$dest.addClass('_duplicated');
		// copy values from source row to destination
		copyValues( $source, $dest );

		setTimeout(function(){
			$dest.removeClass('_duplicated');
		}, 125 );

		duplicatedEvent = $.Event( 'acf_duplicated_row' );
		duplicatedEvent.destination = $dest;

		$source.trigger( duplicatedEvent );
	},
});
