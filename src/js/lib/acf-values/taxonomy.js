import $ from 'jquery';
import radioCopy from './radio.js';
import checkboxCopy from './checkbox.js';
import selectCopy from './select.js';

module.exports = ( $src, $dest ) => { // OKAY
	radioCopy($src, $dest);
	checkboxCopy($src, $dest);
	selectCopy($src, $dest, '> .acf-input > .acf-taxonomy-field > select' );
}
