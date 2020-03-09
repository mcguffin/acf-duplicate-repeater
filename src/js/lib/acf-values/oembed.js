import $ from 'jquery';
import defaultCopy from './default.js';
import textAndHiddenCopy from './text-and-hidden.js';

module.exports = ( $src, $dest ) => { // OKAY
	let val = $src.find('[type="hidden"]').val();

	textAndHiddenCopy( $src, $dest );

	if ( val === false ) {
		val = '';
	}

	acf.getField($dest).search( val );
}
