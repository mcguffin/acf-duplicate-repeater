(function($){
	var options = acf_duplicate_repeater.options,

		orig_repeater = $.extend( {}, acf.fields.repeater ),
		orig_flexible_content = $.extend( {}, acf.fields.flexible_content ),

		/**
		 *	value copy callbacks
		 */
		copy_value_cb = {
		_default: function( $src, $dest, type ) { // OKAY
			var $srces = $src.find('[type="'+type+'"]');
			$dest.find('[type="'+type+'"]').each(function(i,el){
				$(this).val( $( $srces[i] ).val() );
			});

		},
		button_group: function( $src, $dest ) { // OKAY
			var $destRadio = $dest.find('[type="radio"]');
			$src.find('[type="radio"]').each( function(i,el) {
				if ( $(el).prop('checked') ) {
					$( $destRadio[i] ).trigger('click' );
					return false;
				}
			});
		},
		checkbox: function( $src, $dest ) { // OKAY
			var $destCB = $dest.find('[type="checkbox"]');
			$src.find('[type="checkbox"]').each( function(i,el) {
				$( $destCB[i] ).prop('checked', $(el).prop('checked') );
			});
		},
		color_picker: function( $src, $dest ) { // OKAY
			copy_value_cb['_default']($src, $dest, 'text' );
			copy_value_cb['_default']($src, $dest, 'hidden' );
		},
		date_picker: function( $src, $dest ) { // OKAY
			copy_value_cb['_default']($src, $dest, 'text' );
			copy_value_cb['_default']($src, $dest, 'hidden' );
		},
		date_time_picker: function( $src, $dest ) { // OKAY
			copy_value_cb['_default']($src, $dest, 'text' );
			copy_value_cb['_default']($src, $dest, 'hidden' );
		},
		file: function( $src, $dest ) { // OKAY
			var $srcUpl = $src.find('.acf-file-uploader'),
				$destUpl = $dest.find('.acf-file-uploader');

			// set hidden
			copy_value_cb['_default']( $src, $dest, 'hidden' );

			if ( $srcUpl.hasClass('has-value') ) {
				$destUpl.find('div').first().html( $srcUpl.find('div').first().html() );
				$dest.find('.acf-file-uploader').addClass('has-value')
			}
		},
		flexible_content: function( $src, $dest ) {
			var selector = '> .acf-input > .acf-flexible-content > .values > .layout';
			acf.fields.flexible_content.set( '$field', $dest );

			$src.find( selector ).each(function(i,layout){
				// each repeater entry... find fields in repeater entry
				var $layout = $(layout),
					$new_layout;

				acf.fields.flexible_content.add( $layout.data('layout') );

				$new_layout = $dest.find( selector ).last();

				// tbl + block + row
				copy_values( $(layout), $new_layout, '> .acf-table > tbody > .acf-row > .acf-field, > .acf-fields > .acf-field' ); // exclude clones!

			}); // table
		},
		gallery: function( $src, $dest ) { // OKAY
			// copy_value_cb['_default']($src, $dest, 'hidden' );
			var $srcList = $src.find('.acf-gallery-attachments'),
				$destList = $dest.find('.acf-gallery-attachments'),
				$input = $dest.find('input[type="hidden"]'),
				name = $input.attr('name') + '[]';

			$srcList.children().each(function(i,el){
				$clone = $(el).clone();
				$clone.find('[type="hidden"]').attr( 'name', name );
				$destList.append($clone);
			});
		},
		google_map: function( $src, $dest ) { // OKAY
			copy_value_cb['_default']($src, $dest, 'hidden' );
		},
		group: function( $src, $dest ) {
			copy_values( $src, $dest, '> .acf-input > .acf-table > tbody > .acf-row > .acf-field, > .acf-input > .acf-fields > .acf-field' ); // exclude clones!
		},
		image: function( $src, $dest ) { // OKAY
			// set hidden
			copy_value_cb['_default']( $src, $dest, 'hidden' );
			$dest.find('img').attr('src', $src.find('img').attr('src') )
			if ( $src.find('.acf-image-uploader').hasClass('has-value') ) {
				$dest.find('.acf-image-uploader').addClass('has-value')
			}
		},
		link: function( $src, $dest ) { // OKAY
			var $srcNode = $src.find('.link-node'),
				$destNode = $dest.find('.link-node');

			$destNode.html( $srcNode.html() );
			$destNode.attr( 'href', $srcNode.attr( 'href' ) );
			$destNode.attr( 'target', $srcNode.attr( 'target' ) );

			$destNode.trigger('change');
		},
		oembed: function( $src, $dest ) { // OKAY
			$dest.find('[data-name="search-input"]')
				.val( $src.find('[type="hidden"]').val() )
				.trigger('blur');
		},
		post_object: function( $src, $dest ) { // OKAY
			copy_value_cb['select']($src, $dest );
		},
		radio: function( $src, $dest ) { // OKAY
			copy_value_cb['button_group']($src, $dest);
			copy_value_cb['_default']($src, $dest,'text');
		},
		range: function( $src, $dest ) { // OKAY
			copy_value_cb['_default']($src, $dest,'range');
			copy_value_cb['_default']($src, $dest,'number');
		},
		relationship: function( $src, $dest ) { // OKAY
			var $destList = $dest.find('.values > .list'),
				$input = $dest.find('.acf-relationship').children('input[type="hidden"]'),
				name = $input.attr('name') + '[]';

			$src.find('.values > .list').children().each(function(i,el){
				var $clone = $(el).clone();
				$clone.find('[type="hidden"]').attr( 'name', name );
				$destList.append($clone);
			});
			$input.trigger('change');
		},
		repeater:function( $src, $dest ) {

			acf.fields.repeater.set( '$field', $dest );
			$src.find('> .acf-input > .acf-repeater > .acf-table > tbody > .acf-row:not(.acf-clone)').each(function(i,row){
				// each repeater entry... find fields in repeater entry
				var $new_row = acf.fields.repeater.add();

				copy_values( $(row), $new_row, '> .acf-field, > .acf-fields > .acf-field' ); // exclude clones!
			}); // table
		},
		select: function( $src, $dest, _selector ) { // OKAY
			_selector = _selector || ' > .acf-input > select';
			var $srcSelect = $src.find( _selector ),
				$destSelect = $dest.find( _selector );

			if ( $srcSelect.data('ui') * 1 ) {
				// sort $dest like $src
				$destSelect.html('');
				$srcSelect.find('option').each(function(i,el){
					$destSelect.append($(el).clone());
				});
			}
			$destOpts = $destSelect.find('option');
			$srcSelect.find('option').each(function(i,el) {
				$( $destOpts[i] ).prop('selected', $(el).prop('selected') );
			});
		},
		taxonomy: function( $src, $dest ) { // OKAY
			copy_value_cb['radio']($src, $dest);
			copy_value_cb['checkbox']($src, $dest);
			copy_value_cb['select']($src, $dest, '> .acf-input > .acf-taxonomy-field > select' );
		},
		textarea: function( $src, $dest ) { // OKAY
			$dest.find('textarea').val( $src.find('textarea').val() );
		},
		time_picker: function( $src, $dest ) { // OKAY
			copy_value_cb['_default']($src, $dest, 'text' );
			copy_value_cb['_default']($src, $dest, 'hidden' );
		},
		true_false: function( $src, $dest ) { // OKAY
			$dest.find('[type="checkbox"]').prop('checked', $src.find('[type="checkbox"]').prop('checked') );
			$dest.find('[type="checkbox"]').trigger('change');
		},
		user: function( $src, $dest ) { // OKAY
			copy_value_cb['select']( $src, $dest );
		},
		wysiwyg: function( $src, $dest ) { // ...
			var init_cb = function( ed, id, init, $field ) {
				if ( $field.get(0) === $dest.get(0) ) {
					var srcEd = tinymce.get( $src.find('textarea').attr('id') );
					if ( srcEd ) {
						ed.setContent( srcEd.getContent() );
					}
				//	acf.remove_action('wysiwyg_tinymce_init', init_cb ); // mhmmmm
				}
			};
			acf.add_action('wysiwyg_tinymce_init', init_cb );

			$dest.find('textarea').html( $src.find('textarea').html() );
		},
	};

	/**
	 *	Copy values from one acf-field to another
	 *
	 *	@param $src jQuery object holding the .acf-field object to copy from
	 *	@param $dest jQuery object holding the .acf-field object to copy to
	 */
	function copy_value( $src, $dest ) {
		var $srcInput, $destInput, type;

		type = $src.attr('data-type');

		if ( ! copy_value_cb[ type ] ) {
			// tet, range, url, number,
			return copy_value_cb._default( $src, $dest, type );
		}

		return copy_value_cb[type]( $src, $dest );
	}

	/**
	 *	Copy values from one set of acf-fields to another.
	 *	It is assumed that both $src adn $dest have an identical
	 *
	 *	@param $src jQuery object containing the .acf-field objects to copy from
	 *	@param $dest jQuery object containing the .acf-field object to copy to
	 *	@param _selector css selector to select .acf-fields in both $src and $dest
	 */
	function copy_values( $src, $dest, _selector ) {
		var field_map	= {},
			_selector = _selector || '> .acf-field, > .acf-fields > .acf-field',
			$sources	= $src.find( _selector ),
			$dests		= $dest.find( _selector );

		$sources.each( function( i, el ){
			if ( ! $dests[i] ) {
				console.trace('Error: source fields do not match destination fields');
				return false;
			}
			if ( $( $sources[i] ).data('type') !== $($dests[i]).data('type') ) {
				console.trace('Error: source field type does not match destination field type');
				return false;
			}
			copy_value( $( $sources[i] ), $($dests[i]) );
		});
	}

	/**
	 *	Extend acf flexible content field
	 */
	acf.fields.flexible_content = acf.fields.flexible_content.extend({
		events: {
			'click [data-name="duplicate-layout"]': '_duplicate'
		},
		render: function() {

			var ret;

			ret = orig_flexible_content.render.apply( this, arguments );

			// update order numbers
			this.$values.children('.layout').each(function( i, el ){
				if ( ! $(this).find('[data-name="duplicate-layout"]').length ) {
					$(this).find('.acf-fc-layout-controlls').prepend( options.duplicate_flexible_btn );
				}
			});

			return ret;
		},
		_duplicate: function( e ) {
			var layout,
				$field,
				$layout,
				$new_layout;

			// get layout wrapper
			$layout = e.$el.closest('.layout');

			// get flexible_content field
			$field = $layout.closest('.acf-field');

			// acf set field contenxt
			acf.fields.flexible_content.set( '$field', $field );

			// acf add target layout before source layout
			acf.fields.flexible_content.add( $layout.data('layout'), $layout );

			// get the added layout
			$new_layout = $layout.prev( '.layout' );

			// copy values from source layout to destination
			copy_values( $layout, $new_layout, '> .acf-table > tbody > .acf-row > .acf-field, > .acf-fields > .acf-field' ); // exclude clones!

		}
	});

	/**
	 *	Extend acf flexible content field
	 */
	acf.fields.repeater = acf.fields.repeater.extend({
		events: {
			'click a[data-event="duplicate-row"]': '_duplicate'
		},
		render: function() {

			var ret;

			ret = orig_repeater.render.apply( this, arguments );

			// add duplicate btn
			this.$tbody.children().each(function(i){
				$(this).find('> td.remove').append( options.duplicate_repeater_btn );
			});

			return ret;
		},
		_duplicate: function( e ) {

			var $source, $dest;

			// get source row
			if( e.$el.hasClass('acf-icon') ) {
				$source = e.$el.closest('.acf-row');
			} else {
				return;
			}
			// add destination row
			$dest = this.add( $source ); // add before source!

			// copy values from source row to destination
			copy_values( $source, $dest );

			this.$input.trigger('change');
		},
	});


})(jQuery)
