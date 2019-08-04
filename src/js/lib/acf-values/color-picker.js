import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	const srcField = acf.getField($src),
		destField = acf.getField($dest),
		val = srcField.$inputText().val();

	destField.$inputText().iris( 'option', 'color', val );
}
