/**
 * Color Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};
    
    $.fluent.color = {
        
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
    };
    
    $(document).on('fluent/create_fields', function(e, el){
		
		$(el).find('.field-type-color input[type="text"]').each(function(){
			
			$.fluent.color.set({ $el : $(this) }).init();
			
		});
		
	});

    $(document).on('input', '.field-type-color input[type="text"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/color/value', function(id){
        return $('#field-'+id).find('input[type="text"]').first().val();
    });

    $(document).on('fluent/validate/color', function(e, id, data){

        var msg = data.msg;
    
        if(!$.trim($('.options-table #' + id).val()).length){
            if(!$('.options-table #' + id).closest('tr').hasClass('options-required')){
                $('.options-table #' + id).closest('tr').addClass('options-required');
                $('.options-table #' + id).closest('td').append('<p class="description options-error">'+msg+'</p>');
            }
            $.fluent.passes = false;
        }
        
        $(document).on('click', '.options-table #field-' + id + ' *', function(){
            var input = $('input[type="text"]', $(this).closest('td'));
            if($.trim($(input).val()).length > 0){
                if($(this).closest('tr').hasClass('options-required')){
                    $(this).closest('tr').removeClass('options-required');
                    $('p.options-error', $(this).closest('td')).remove();
                }
            }else{
                if(!$(this).closest('tr').hasClass('options-required')){
                    $(this).closest('tr').addClass('options-required');
                    $(this).closest('td').append('<p class="description options-error">'+msg+'</p>');
                }
            }
        });
        
    });
    
})(jQuery);