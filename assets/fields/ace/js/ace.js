(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $.fluent.ace = {
        
        $el: null,
        
        set: function( o ){
            $.extend( this, o );
            return this;
        },
        
        init: function(){
            if($.fluent.is_clone_field(this.$el)){
                return false;
            }

            var textarea = $(this.$el);
 
            var mode = textarea.attr('data-ace-mode');
            var theme = textarea.attr('data-ace-theme');
 
            var editDiv = $('<div>', {
                position: 'absolute',
                width: '100%',
                height: '200px',//textarea.height(),
                'border-radius': '2px',
                'class': textarea.attr('class')
            }).insertBefore(textarea);
 
            textarea.css('display', 'none');
 
            var editor = ace.edit(editDiv[0]);
            editor.renderer.setShowGutter(true);
            editor.getSession().setValue(textarea.val());
            editor.getSession().setMode("ace/mode/" + mode);
            editor.setTheme("ace/theme/"+theme);

            editor.getSession().on('change', function(e) {
				textarea.val(editor.getSession().getValue());
				$(document).trigger('fluent/field/change', $(textarea));
			});
        }
    };

    $(document).on('change', '.field-type-ace textarea', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/ace/value', function(id){
        return $('#field-'+id).find('textarea').first().val();
    });

    $(document).on('fluent/create_fields', function(e, el){
		
		$(el).find('.field-type-ace textarea').each(function(){
			
			$.fluent.ace.set({ $el : $(this) }).init();
			
		});
		
	});

})(jQuery);