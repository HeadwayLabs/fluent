/**
 * Date Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};
    
    $.fluent.date = {
        
        $el: null,
        
        set: function( o ){
            $.extend( this, o );
            return this;
        },
        
        init: function(){
            if($.fluent.is_clone_field(this.$el)){
                return false;
            }
            $(this.$el).datepicker({
                onSelect : function(dateText, inst){
                    $(this).trigger('input');
                }
            });
        }
    };
    
    $(document).on('fluent/create_fields', function(e, el){
		$(el).find('.field-type-date input[type="text"]').each(function(){
            $.fluent.date.set({ $el : $(this) }).init();
		});
	});
    
    $(document).on('click', '.field-type-date .dashicons', function(){
        $(this).prev('input').datepicker('show');
    });

    $(document).on('input', '.field-type-date input[type="text"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/date/value', function(id){
        return $('#field-'+id).find('input[type="text"]').first().val();
    });
    
})(jQuery);