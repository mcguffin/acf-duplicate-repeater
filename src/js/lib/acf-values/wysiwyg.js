import $ from 'jquery';

module.exports = ( $src, $dest ) => { // ...
	const srcField = acf.getField($src),
		destField = acf.getField($dest),
		dest_id = destField.$input().attr('id'),
		val = srcField.getValue();

	let editor = tinymce.get( dest_id );

	if ( !! editor ) {
		// editor already inited
		editor.setContent( val );
		$dest.find('textarea').val( $src.find('textarea').val() )
		editor.save();
	} else {
		// delayed init
		destField.$input().html( val );
	}
}
