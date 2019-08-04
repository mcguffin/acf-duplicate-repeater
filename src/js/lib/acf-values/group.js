import $ from 'jquery';
import { copyValues } from 'acf-values.js';

module.exports = ( $src, $dest ) => {
	copyValues( $src, $dest, '> .acf-input > .acf-table > tbody > .acf-row > .acf-field, > .acf-input > .acf-fields > .acf-field' ); // exclude clones!
}
