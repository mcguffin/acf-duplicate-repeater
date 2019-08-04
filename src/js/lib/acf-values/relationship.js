import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	const $destList = $dest.find('.values > .list'),
		$input = $dest.find('.acf-relationship').children('input[type="hidden"]'),
		name = $input.attr('name') + '[]';

	$src.find('.values > .list').children().each( (i,el) => {
		const $clone = $(el).clone();
		$clone.find('[type="hidden"]').attr( 'name', name );
		$destList.append($clone);
	});
	$input.trigger('change');
}
