import $ from 'jquery';
import defaultCopy from './default.js';

module.exports = ( $src, $dest ) => { // OKAY
	// set hidden
	defaultCopy( $src, $dest, 'hidden' );
	$dest.find('img').attr('src', $src.find('img').attr('src') )
	if ( $src.find('.acf-image-uploader').hasClass('has-value') ) {
		$dest.find('.acf-image-uploader').addClass('has-value')
	}
}
