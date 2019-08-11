import $ from 'jquery';
import defaultCopy from './default.js';
import textAndHiddenCopy from './text-and-hidden.js';

module.exports = ( $src, $dest ) => { // OKAY
	const val = $src.find('[type="hidden"]').val();

	textAndHiddenCopy( $src, $dest );

	acf.getField($dest).search( val );
}
