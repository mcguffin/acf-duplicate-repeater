import $ from 'jquery';
import buttonGroupCopy from './button-group.js';
import defaultCopy from './default.js';

module.exports = ( $src, $dest ) => { // OKAY
	buttonGroupCopy($src, $dest);
	defaultCopy($src, $dest,'text');
}
