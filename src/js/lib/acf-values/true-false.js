import $ from 'jquery';

module.exports = ( $src, $dest ) => { // OKAY
	$dest.find('[type="checkbox"]').prop('checked', $src.find('[type="checkbox"]').prop('checked') );
	$dest.find('[type="checkbox"]').trigger('change');
}
