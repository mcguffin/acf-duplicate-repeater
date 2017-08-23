(function($){
	var options = acf_duplicate_repeater.options,
		orig_repeater = $.extend( {}, acf.fields.repeater );

	acf.fields.repeater = acf.fields.repeater.extend({
		events: {
			'click a[data-event="duplicate-row"]': '_duplicate'
		},
		_duplicate: function( e ) {
			var $prev_clone, 
				id, uniquid,
				$row = false, 
				$copy,
				search_id, replace_id,
				search_name, replace_name;
			// vars
			
			
			// row add
			if( e.$el.hasClass('acf-icon') ) {
			
				$row = e.$el.closest('.acf-row');
				
			}

			// backup acf clone options
			$prev_clone = this.$clone;

			// setup search/replace
			id				= $row.attr('data-id');
			uniquid			= acf.get_uniqid();
			search_id		= '-'+id+'-';
			replace_id		= '-'+uniquid+'-';
			search_name 	= '['+id+']';
			replace_name	= '['+uniquid+']';

			// fake acf.clone() current row
			this.$clone = {
				'$el'		: $row,
				'search'	: '__none__',
				'replace'	: '__none__',
			};


			// make copy
			$copy = this.add( $row );

			// setup $copy
			$copy.attr('data-id', uniquid );
				
			// replace ids
			$copy.find('[id*="' + id + '"]').each(function(){	
				$(this).attr('id', $(this).attr('id').replace( search_id, replace_id ) );
			});
			
			// replace names
			$copy.find('[name*="' + id + '"]').each(function(){	
				$(this).attr('name', $(this).attr('name').replace( search_name, replace_name ) );
			});
			
			// replace label for
			$copy.find('label[for*="' + id + '"]').each(function(){
				$(this).attr('for', $(this).attr('for').replace( search_id, replace_id ) );
			});

			// restore acf clone options
			this.$clone = $prev_clone;
			
			// give the copy back
			return $copy;

		},

		initialize: function() {

			var ret;

			ret = orig_repeater.initialize.apply(this,arguments);

			// update order numbers
			this.$tbody.children().each(function(i){
				$(this).find('> td.remove').append( options.duplicate_btn );
			});

			return ret;
		},
	
	});
	

})(jQuery)