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
		val = srcEditor.getContent()
		// editor already inited
		destEditor.setContent( val );
		$dest.find('textarea').val( $src.find('textarea').val() )
		destEditor.save();
		console.log(val);
	} else {
		val = srcField.getValue();
		// delayed init
		destField.$input().html( val );
	}
}
