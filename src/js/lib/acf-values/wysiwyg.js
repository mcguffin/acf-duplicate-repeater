import $ from 'jquery';

module.exports = ( $src, $dest ) => { // ...
	const srcField = acf.getField($src),
		destField = acf.getField($dest),
		src_id = srcField.$input().attr('id'),
		dest_id = destField.$input().attr('id');
	let val;
	let srcEditor = tinymce.get( src_id );
	let destEditor = tinymce.get( dest_id );

	if ( !! destEditor && !! srcEditor ) {
		// editor already inited
		val = srcEditor.getContent()
		destEditor.setContent( val );
		$dest.find('textarea').val( $src.find('textarea').val() )
		destEditor.save();
	} else {
		// delayed init
		val = srcField.getValue();
		destField.$input().html( val );
	}
}
