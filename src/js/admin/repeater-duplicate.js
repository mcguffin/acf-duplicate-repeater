(function($){
	var options = acf_duplicate_repeater.options,
		orig_repeater = $.extend( {}, acf.fields.repeater );

	acf.fields.repeater = acf.fields.repeater.extend({
		events: {
			'click a[data-event="duplicate-row"]': '_duplicate'
		},
		prepare_template: function( $el, $orig ) {
			var $clone;

			this.reset_ids( $el );

			$clone_row = $orig.closest('.acf-table').find('tr.acf-clone');

			$el.find('.acf-field-wysiwyg').each(function(){
				var $textarea = $(this).find('.tmce-active textarea.wp-editor-area'),
					rte_value = $textarea.html(),
					$this_clone = $clone_row.find('[data-key="'+ $(this).attr('data-key') +'"]');

				$(this).html( $this_clone.html() );

				$(this).find('textarea.wp-editor-area').html( rte_value );
				
			});

		},
		reset_ids: function( $el ) {
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

			this.prepare_template( $template, $row );

			// fake acf.clone() current row
			this.$clone = {
				'$el'		: $template,
				'search'	: 'acfcloneindex',
				'replace'	: false,
			};

			$row.find('.acf-field-wysiwyg').each(function( i, el ) {
				var $field = $(this);
			});

			// make copy
			$copy = this.add( $row );

			// restore acf clone options
			this.$clone = $prev_clone;
			$tmp.remove();

			// init fields
			//*/
			// give the copy back
			return $copy;

		},

		render: function() {

			var ret;

			ret = orig_repeater.render.apply( this, arguments );

			// update order numbers
			this.$tbody.children().each(function(i){
				$(this).find('> td.remove').append( options.duplicate_btn );
			});

			return ret;
		},
	
	});
	

})(jQuery)