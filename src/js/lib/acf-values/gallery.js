import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	// copy_value_cb['_default']($src, $dest, 'hidden' );
	const $srcList = $src.find('.acf-gallery-attachments'),
		$destList = $dest.find('.acf-gallery-attachments'),
		$input = $dest.find('input[type="hidden"]'),
		name = $input.attr('name') + '[]';

	$srcList.children().each( (i,el) => {
		let $clone = $(el).clone();
		$clone.find('[type="hidden"]').attr( 'name', name );
		$destList.append($clone);
	});
}
