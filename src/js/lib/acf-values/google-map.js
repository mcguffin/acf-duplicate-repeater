import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	const srcField = acf.getField($src),
		destField = acf.getField($dest);
	destField.setValue( srcField.getValue() );
}
