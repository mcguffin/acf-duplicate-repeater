import $ from 'jquery';
import defaultCopy from './default.js';

module.exports = ( $src, $dest ) => { // OKAY
	const val = $src.find('[type="hidden"]').val();

	defaultCopy($src, $dest,'hidden');
	defaultCopy($src, $dest,'text');

	acf.getField($dest).search( val );
}
