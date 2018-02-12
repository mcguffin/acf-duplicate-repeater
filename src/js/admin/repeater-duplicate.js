(function($){
	var options = acf_duplicate_repeater.options,
		orig_repeater = $.extend( {}, acf.fields.repeater ),
		orig_flexible_content = $.extend( {}, acf.fields.flexible_content );


	function reset_ids( $el ) {
		var id = $el.attr('data-id'),
			new_id = 'acfcloneindex',
			search_id		= '-'+id+'-',
			replace_id		= '-'+new_id+'-',
			search_name 	= '['+id+']',
			replace_name	= '['+new_id+']';

		$el.attr('data-id', new_id );

		// replace ids
		$el.find('[id*="' + id + '"]').each(function(){
			$(this).attr('id', $(this).attr('id').replace( search_id, replace_id ) );
		});

		// replace names
		$el.find('[name*="' + id + '"]').each(function(){
			$(this).attr('name', $(this).attr('name').replace( search_name, replace_name ) );
		});

		// replace label for
		$el.find('label[for*="' + id + '"]').each(function(){
			$(this).attr('for', $(this).attr('for').replace( search_id, replace_id ) );
		});

		$el.find('textarea.wp-editor-area').each(function(){
			$(this).attr( 'id', 'acf-editor-' + acf.get_uniqid() );
		});
	}

	function reset_fields( $el, $clone_template ) {

		// rich text editor
		$el.find('.acf-field-wysiwyg').each(function(){
			var $textarea = $(this).find('.tmce-active textarea.wp-editor-area'),
				rte_value = $textarea.html(),
				$this_clone = $clone_template.find('[data-key="'+ $(this).attr('data-key') +'"]');

			$(this).html( $this_clone.html() );

			$(this).find('textarea.wp-editor-area').html( rte_value );

		});

		// color picker
		$el.find('.acf-field-color-picker').each(function(){
			var $input = $(this).find('[type="hidden"]'),
				color_value = $input.val(),
				$this_clone = $clone_template.find('[data-key="'+ $(this).attr('data-key') +'"]');

			$(this).html( $this_clone.html() );

			$(this).find('[type="hidden"]').val( color_value ).next().val( color_value );

		});
	}


	acf.fields.flexible_content = acf.fields.flexible_content.extend({
		events: {
			'click [data-name="duplicate-layout"]': '_duplicate'
		},
		render: function() {

			var ret;

			ret = orig_flexible_content.render.apply( this, arguments );

			// update order numbers
			this.$values.children('.layout').each(function( i ){
				$(this).find('.acf-fc-layout-controlls').prepend( options.duplicate_flexible_btn );
			});

			return ret;
		},
		_duplicate: function( e ) {
			var layout,
				$before,
				$clone,
				$layout_template;

			$before = e.$el.closest('.layout');

			layout = $before.attr( 'data-layout' );

			$clone = $before.clone();

			reset_ids( $clone );

			reset_fields( $clone, this.$clones.children('.layout[data-layout="' + layout + '"]') );

			$clone.attr( 'data-layout', '_duplicate' ).appendTo(this.$clones);

			this.add( '_duplicate', $before );

			$clone.remove();

		},
		get_me:function(){
			console.log(this);
		}
	});

	acf.fields.repeater = acf.fields.repeater.extend({
		events: {
			'click a[data-event="duplicate-row"]': '_duplicate'
		},

		render: function() {

			var ret;

			ret = orig_repeater.render.apply( this, arguments );

			// update order numbers
			this.$tbody.children().each(function(i){
				$(this).find('> td.remove').append( options.duplicate_repeater_btn );
			});

			return ret;
		},

		_duplicate: function( e ) {

			var $prev_clone,
				id, uniquid,
				$row,
				$template, $tmp,
				$copy;
			// vars


			// add before row
			if( e.$el.hasClass('acf-icon') ) {
				$row = e.$el.closest('.acf-row');
			}

			// backup acf clone options
			$prev_clone = this.$clone;

			$template = $row.clone();
			$tmp = $('<table />').appendTo('body').append( $template );

			reset_ids( $template );

			reset_fields( $template, $row.closest('.acf-table').find('tr.acf-clone') );

			// fake acf.clone() current row
			this.$clone = {
				'$el'		: $template,
				'search'	: 'acfcloneindex',
				'replace'	: false,
			};

			// get selection-field values, because these aren't copied by default
			// see: https://api.jquery.com/clone/#entry-longdesc
			var selectedValue = {};
			$row.find('select').each(function(index) {
				selectedValue[index] = $(this).val();
			});

			$row.find('.acf-field-wysiwyg').each(function( i, el ) {
				var $field = $(this);
			});

			// get wysiwyg-field values, because these aren't copied by default
			// see: https://api.jquery.com/clone/#entry-longdesc
			var $editorContent = {};
			$row.find('.acf-field-wysiwyg iframe').contents().find("body").each(function(index) {
				$editorContent[index] = $(this).html();
			});

			// make copy
			$copy = this.add( $row );

			// restore acf clone options
			this.$clone = $prev_clone;
			$tmp.remove();

			// restore selection values
			$copy.find('select').each(function(index) {
				$(this).find("option[value = '" + selectedValue[index] + "']").attr("selected", "selected");
			});

			// restore WYSIWYG editor contents
			$copy.find('.acf-field-wysiwyg textarea').each(function(index) {
				$(this).html($editorContent[index]);
			});

			// init fields
			//*/
			// give the copy back
			return $copy;

		},
	});


})(jQuery)
