import $ from 'jquery';
import copyValues from '../acf-values.js';

module.exports = ( $src, $dest ) => {

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
}
