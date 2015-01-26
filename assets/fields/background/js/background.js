/**
 * Background Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};
    
    $.fluent.background = {

        color: {
        
            $el: null,
            
            set: function( o ){
                $.extend( this, o );
                return this;
            },
            
            init: function(){
                if($.fluent.is_clone_field(this.$el)){
                    return false;
                }
                $(this.$el).wpColorPicker({
                    change: _.throttle(function() {
                        $(this).trigger( 'change' );
                    }, 1000)
                });
            }
        }

    };

    
    $(document).on('fluent/create_fields', function(e, el){
		
		$(el).find('.field-type-background input[type="text"].color').each(function(){
			
			$.fluent.background.color.set({ $el : $(this) }).init();
			
		});
	});

    $(document).on('fluent/field/change', function(){
        $('.field-type-background .options-media-id').each(function(){
            if($(this).val() === ''){
                $(this).closest('.field-type-background').find('tr.image').fadeOut();
            }else{
                $(this).closest('.field-type-background').find('tr.image').fadeIn();
            }
        });
    });

    $(document).on('input', '.field-type-background input[type="text"].color', function(){
        $(document).trigger('fluent/field/change', $(this));
    });
    
})(jQuery);