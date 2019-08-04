import $ from 'jquery';
import defaultCopy from './default.js';

module.exports =
( $src, $dest ) => { // OKAY
	const $srcUpl = $src.find('.acf-file-uploader'),
		$destUpl = $dest.find('.acf-file-uploader');

	// set hidden
	defaultCopy( $src, $dest, 'hidden' );

	if ( $srcUpl.hasClass('has-value') ) {
		$destUpl.find('div').first().html( $srcUpl.find('div').first().html() );
		$dest.find('.acf-file-uploader').addClass('has-value')
	}
}
