import $ from 'jquery';

module.exports = ( $src, $dest ) => {
	const selector = '> .acf-input > .acf-flexible-content > .values > .layout',
		srcField = acf.getField($src),
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
}
