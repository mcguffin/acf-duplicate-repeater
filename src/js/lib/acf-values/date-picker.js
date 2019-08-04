import $ from 'jquery';
import defaultCopy from './default.js';

module.exports = ( $src, $dest ) => { // OKAY
	console.log($src,$dest)
	defaultCopy($src, $dest, 'text' );
	defaultCopy($src, $dest, 'hidden' );
}
