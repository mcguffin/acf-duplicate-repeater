import $ from 'jquery';
import defaultCopy from './default.js';

module.exports = ( $src, $dest ) => { // OKAY
	defaultCopy($src, $dest,'range');
	defaultCopy($src, $dest,'number');
}
