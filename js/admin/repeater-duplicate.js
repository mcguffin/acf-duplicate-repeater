(function($){
	var options = acf_duplicate_repeater.options,


		/**
		 *	value copy callbacks
		 */
		copy_value_cb = {
			_default: function( $src, $dest, type ) { // OKAY
				var $srces = $src.find('[type="'+type+'"]'),
					srcField = acf.getField($src),
					destField = acf.getField($dest);
				//destField.val( srcField.val );

				$dest.find('[type="'+type+'"]').each(function(i,el){
					//console.log(type,this,$srces[i],$( $srces[i] ).val())
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
				var srcField = acf.getField($src),
					destField = acf.getField($dest),
					val = srcField.$inputText().val();

				destField.$inputText().iris( 'option', 'color', val );
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
				var selector = '> .acf-input > .acf-flexible-content > .values > .layout',
					srcField = acf.getField($src),
					destField = acf.getField($dest);
				//acf.fields.flexible_content.set( '$field', $dest );

				srcField.$layouts().each(function(i,layout){
					// each repeater entry... find fields in repeater entry
					var $layout = $(layout),
						$new_layout;

					destField.add( { layout: $layout.data('layout') } );

					$new_layout = destField.$layouts().last();

					// tbl + block + row
					copy_values( $layout, $new_layout, '> .acf-table > tbody > .acf-row > .acf-field, > .acf-fields > .acf-field' ); // exclude clones!

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
				var srcField = acf.getField($src),
					destField = acf.getField($dest);
				destField.setValue( srcField.getValue() );
//				copy_value_cb['_default']($src, $dest, 'hidden' );
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
				var srcField = acf.getField($src),
					destField = acf.getField($dest);

				srcField.$rows().each(function(i,row){
					$new_row = destField.add();
					copy_values( $(row), $new_row, '> .acf-field, > .acf-fields > .acf-field' );
				});

				// $src.find('> .acf-input > .acf-repeater > .acf-table > tbody > .acf-row:not(.acf-clone)').each(function(i,row){
				// 	// each repeater entry... find fields in repeater entry
				// 	var $new_row = acf.fields.repeater.add();
				//
				// 	copy_values( $(row), $new_row, '> .acf-field, > .acf-fields > .acf-field' ); // exclude clones!
				// }); // table
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
				var srcField = acf.getField($src),
					destField = acf.getField($dest),
					dest_id = destField.$input().attr('id'),
					val = srcField.getValue(), editor;

				editor = tinymce.get( dest_id );

				if ( !! editor ) {
					// editor already inited
					editor.setContent( val );
					$dest.find('textarea').val( $src.find('textarea').val() )
					editor.save();
				} else {
					// delayed init
					destField.$input().html( val );
				}
			},
		};

	/**
	 *	Copy values from one acf-field to another
	 *
	 *	@param $src jQuery object holding the .acf-field object to copy from
	 *	@param $dest jQuery object holding the .acf-field object to copy to
	 */
	function copy_value( $src, $dest ) {
		var type,
			copyEvent,
			doneEvent;

		type = $src.attr('data-type');

		copyEvent = $.Event( 'acf_duplicate:' + type );
		copyEvent.destination = $dest;

		$src.trigger( copyEvent );

		// allow canceling
		if ( copyEvent.isDefaultPrevented() ) {
			return;
		}

		if ( ! copy_value_cb[ type ] ) {
			// Defalt behaviour for text, range, url, number,
			copy_value_cb._default( $src, $dest, type );
		} else {
			copy_value_cb[type]( $src, $dest );
		}

		doneEvent = $.Event( 'acf_duplicated:' + type );
		doneEvent.destination = $dest;

		$src.trigger( doneEvent );
	}

	/**
	 *	Copy values from one set of acf-fields to another.
	 *	It is assumed that both $src and $dest have identical fields
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

	var _extend = function(obj,extend) {
		var parent = $.extend({},obj);
		$.each(extend,function(k,v) {
			if ( 'undefined' !== typeof obj[k] ) {
				if ( 'events' === k ) {
					obj.events = $.extend( obj.events, v );
					return;
				} else if ( 'function' === typeof v ) {
					parent[k] = obj[k]; //
				}
			}
			obj[k] = v;
		});
		obj.parent = parent;
		return obj;
	}

	_extend( acf.models.FlexibleContentField.prototype, {
		events: {
			'click [data-name="duplicate-layout"]': '_duplicate'
		},
		render: function() {

			var ret;

			ret = this.parent.render.apply( this, arguments );

			// add duplicate btn
			this.$layouts().each(function( i, el ){
				if ( ! $(this).find('[data-name="duplicate-layout"]').length ) {
					$(this).find('.acf-fc-layout-controls').prepend( options.duplicate_flexible_btn );
				}
			});

			return ret;
		},
		_duplicate: function( e ) {
			var layout,
				duplicatedEvent,
				$field,
				$layout,  // original field
				$new_layout; // cloned field

			// get layout wrapper
			$layout = $(e.target).closest('.layout');

			// get flexible_content field
			$field = $layout.closest('.acf-field');

			// acf set field contenxt
			//acf.fields.flexible_content.set( '$field', $field );

			// acf add target layout before source layout
			this.add( {
				layout: $layout.data('layout'),
				before: $layout,
			});

			// get the added layout
			$new_layout = $layout.prev( '.layout' );
			$new_layout.addClass('_duplicated');

			// copy values from source layout to destination
			copy_values( $layout, $new_layout, '> .acf-table > tbody > .acf-row > .acf-field, > .acf-fields > .acf-field' ); // exclude clones!
//			$new_layout.removeClass('_duplicated');
			setTimeout(function(){
				$new_layout.removeClass('_duplicated');
			}, 125 );

			duplicatedEvent = $.Event( 'acf_duplicated_layout' );
			duplicatedEvent.destination = $new_layout;

			$layout.trigger( duplicatedEvent );

		}
	});

	//acf.fields.flexible_content = acf.fields.flexible_content.extend();

	/**
	 *	Extend acf flexible content field
	 */
	 _extend( acf.models.RepeaterField.prototype, {
		events: {
			'click a[data-event="duplicate-row"]': '_duplicate'
		},
		render: function() {

			var ret;

			ret = this.parent.render.apply( this, arguments );

			// add duplicate btn
			this.$rows().each(function(i){
				$(this).find('> td.remove').append( options.duplicate_repeater_btn );
			});

			return ret;
		},
		_duplicate: function( e ) {

			var $source, $dest, duplicatedEvent;

			// get source row
			if( $(e.target).hasClass('acf-icon') ) {
				$source = $(e.target).closest('.acf-row');
			} else {
				return;
			}
			// add destination row
			$dest = this.add( { before: $source } ); // add before source!
			$dest.addClass('_duplicated');
			// copy values from source row to destination
			copy_values( $source, $dest );

			setTimeout(function(){
				$dest.removeClass('_duplicated');
			}, 125 );

			duplicatedEvent = $.Event( 'acf_duplicated_row' );
			duplicatedEvent.destination = $dest;

			$source.trigger( duplicatedEvent );
		},
	});


})(jQuery);
