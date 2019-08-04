import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	const $destRadio = $dest.find('[type="radio"]');
	$src.find('[type="radio"]').each( (i,el) =>  {
		if ( $(el).prop('checked') ) {
			$( $destRadio[i] ).trigger('click' );
			return false;
		}
	});
}
