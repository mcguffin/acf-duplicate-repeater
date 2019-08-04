import $ from 'jquery';

module.exports = ( $src, $dest, _selector ) => { // OKAY
	_selector = _selector || ' > .acf-input > select';
	const $srcSelect = $src.find( _selector ),
		$destSelect = $dest.find( _selector );

	let $destOpts;

	if ( $srcSelect.data('ui') * 1 ) {
		// sort $dest like $src
		$destSelect.html('');
		$srcSelect.find('option').each( (i,el) => {
			$destSelect.append($(el).clone());
		} );
	}
	$destOpts = $destSelect.find('option');
	$srcSelect.find('option').each( (i,el) => {
		$( $destOpts[i] ).prop('selected', $(el).prop('selected') );
	} );
}
