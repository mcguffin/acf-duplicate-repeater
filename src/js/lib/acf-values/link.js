import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	const $srcNode = $src.find('.link-node'),
		$destNode = $dest.find('.link-node');

	$destNode.html( $srcNode.html() );
	$destNode.attr( 'href', $srcNode.attr( 'href' ) );
	$destNode.attr( 'target', $srcNode.attr( 'target' ) );

	$destNode.trigger('change');
}
