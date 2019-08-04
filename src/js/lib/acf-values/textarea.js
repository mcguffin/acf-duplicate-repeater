import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	$dest.find('textarea').val( $src.find('textarea').val() );
}
