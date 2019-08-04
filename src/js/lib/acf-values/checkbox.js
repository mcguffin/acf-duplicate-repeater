import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	const $destCB = $dest.find('[type="checkbox"]');
	$src.find('[type="checkbox"]').each( function(i,el) {
		$( $destCB[i] ).prop('checked', $(el).prop('checked') );
	});
}
