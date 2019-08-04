import $ from 'jquery';

module.exports = ( $src, $dest, type ) => { // OKAY
	const $srces = $src.find('[type="'+type+'"]'),
		srcField = acf.getField($src),
		destField = acf.getField($dest);
	//destField.val( srcField.val );

	$dest.find('[type="'+type+'"]').each( (i,el) => {
		$(el).val( $( $srces[i] ).val() );
	});
}
