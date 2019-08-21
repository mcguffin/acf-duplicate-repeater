import $ from 'jquery';



/**
 *	value copy callbacks
 */
const copyValueCB = {
	_default: 			require('acf-values/default.js'),
	accordion:			( $src, $dest ) => {
		copyValues(
			$src,
			$dest,
			'> .acf-input > .acf-table > tbody > .acf-row > .acf-field, > .acf-input > .acf-fields > .acf-field'
		);
	},
	button_group: 		require('acf-values/button-group.js'),
	checkbox: 			require('acf-values/checkbox.js'),
	color_picker: 		require('acf-values/color-picker.js'),
	text_and_hidden:	require('acf-values/text-and-hidden.js'),
	date_time_picker:	require('acf-values/text-and-hidden.js'),
	file: 				require('acf-values/file.js'),
	flexible_content: 	( $src, $dest ) => {
		const srcField = acf.getField($src),
			destField = acf.getField($dest);

		srcField.$layouts().each( (i,layout) => {
			// each repeater entry... find fields in repeater entry
			const $layout = $(layout);
			let $new_layout;

			destField.add( { layout: $layout.data('layout') } );

			$new_layout = destField.$layouts().last();

			// tbl + block + row
			copyValues(
				$layout,
				$new_layout,
				'> .acf-table > tbody > .acf-row > .acf-field, > .acf-fields > .acf-field'
			); // exclude clones!

		}); // table
	},
	gallery: 			require('acf-values/gallery.js'),
	google_map: 		require('acf-values/google-map.js'),
	group: 				( $src, $dest ) => {
		copyValues( $src, $dest, '> .acf-input > .acf-table > tbody > .acf-row > .acf-field, > .acf-input > .acf-fields > .acf-field' ); // exclude clones!
	},
	image: 				require('acf-values/image.js'),
	link: 				require('acf-values/link.js'),
	oembed: 			require('acf-values/oembed.js'),
	radio: 				require('acf-values/radio.js'),
	range: 				require('acf-values/range.js'),
	relationship: 		require('acf-values/relationship.js'),
	repeater: 			( $src, $dest ) => {

		const srcField = acf.getField($src),
			destField = acf.getField($dest),
			destRows = destField.$rows();

		srcField.$rows().each( (i,row) => {
			let $new_row;
			if ( ! destRows[i] ) {
				$new_row = destField.add();
			} else {
				$new_row = $(destRows[i]);
			}

			copyValues( $(row), $new_row, '> .acf-field, > .acf-fields > .acf-field' );
		});

		// $src.find('> .acf-input > .acf-repeater > .acf-table > tbody > .acf-row:not(.acf-clone)').each(function(i,row){
		// 	// each repeater entry... find fields in repeater entry
		// 	var $new_row = acf.fields.repeater.add();
		//
		// 	copyValues( $(row), $new_row, '> .acf-field, > .acf-fields > .acf-field' ); // exclude clones!
		// }); // table
	},
	select: 			require('acf-values/select.js'),
	taxonomy: 			require('acf-values/taxonomy.js'),
	textarea: 			require('acf-values/textarea.js'),
	true_false: 		require('acf-values/true-false.js'),
	user: 				require('acf-values/user.js'),
	wysiwyg: 			require('acf-values/wysiwyg.js'),
};

//
copyValueCB.date_time_picker = copyValueCB.date_picker = copyValueCB.time_picker = copyValueCB.text_and_hidden;
copyValueCB.post_object = copyValueCB.page_link = copyValueCB.select;

/**
 *	Copy values from one acf-field to another
 *
 *	@param $src jQuery object holding the .acf-field object to copy from
 *	@param $dest jQuery object holding the .acf-field object to copy to
 */
const copyValue = ( $src, $dest ) => {
	const type  = $src.attr('data-type'),
		destField = acf.getField( $dest ),
		copyEvent = $.Event( 'acf_duplicate:' + type ),
		doneEvent = $.Event( 'acf_duplicated:' + type );

	copyEvent.destination = doneEvent.destination = $dest;

	$src.trigger( copyEvent );

	// allow canceling
	if ( copyEvent.isDefaultPrevented() ) {
		return;
	}

	if ( !! copyValueCB[type] ) {
		copyValueCB[type]( $src, $dest )
	} else if ( ['text','email', 'url', 'number'].indexOf(type) !== -1 ) {
		// Defalt behaviour for text, range, url, number,
		copyValueCB._default( $src, $dest, type );
	} else {
		copyValueCB.text_and_hidden( $src, $dest );
	}

	$src.trigger( doneEvent );

	if ( destField.has('conditions') ) {
		destField.getConditions().render();
	}
}

/**
 *	Copy values from one set of acf-fields to another.
 *	It is assumed that both $src and $dest have identical fields
 *
 *	@param $src jQuery object containing the .acf-field objects to copy from
 *	@param $dest jQuery object containing the .acf-field object to copy to
 *	@param _selector css selector to select .acf-fields in both $src and $dest
 */
const copyValues = ( $src, $dest, _selector ) => {

	_selector = _selector || '> .acf-field, > .acf-fields > .acf-field';

	const field_map	= {},
		$sources	= $src.find( _selector ),
		$dests		= $dest.find( _selector );

	$sources.each( ( i, el ) => {
		console.log('src',i,el);
		console.log('dest',i,$dests[i]);
		if ( ! $dests[i] ) {
			console.trace('Error: source fields do not match destination fields');
			return false;
		}
		if ( $( $sources[i] ).data('type') !== $($dests[i]).data('type') ) {
			console.trace('Error: source field type does not match destination field type');
			return false;
		}
		copyValue( $( $sources[i] ), $($dests[i]) );
	});
}



module.exports = { copyValues }
