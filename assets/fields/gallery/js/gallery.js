/**
 * Switch Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};
    
    $.fluent.gallery = {
        
        $el: null,
        
        set: function( o ){
            $.extend( this, o );
            return this;
        },
        
        init: function(){
            $.fluent.gallery.sortable();
        
            $(document).on('click', '.field-type-gallery .options-gallery-remove', function(){
                var parent = $(this).parent(); 
                $('.options-gallery-images div', parent).fadeOut();
                $('.options-gallery-images', parent).html('').removeClass('options-gallery-images-has-children');
                $('.options-gallery-ids', parent).val('').trigger('input');
                return false;
            });
            
            $(document).on('click', '.field-type-gallery .options-gallery-add-edit', function(){
                var parent = $(this).parent(); 
                var image_div = $('.options-gallery-images', parent);
                var input = $('.options-gallery-ids', parent);
                
                var val = input.val();
                var final;
                if (!val) {
                    final = '[gallery ids="0" className="test"]';
                } else {
                    final = '[gallery ids="' + val + '" className="test"]';
                }
                
                var frame = wp.media.gallery.edit(final);
                
                frame.content.get('view').sidebar.unset('gallery');
                
                frame.state('gallery-edit').on( 'update', function( selection ) {
                    image_div.html("").removeClass('options-gallery-images-has-children');
                    
                    var element, preview_html= "", preview_img;
                    var ids = selection.models.map(function(e){
                        element = e.toJSON();
                        preview_img = typeof element.sizes.thumbnail !== 'undefined'  ? element.sizes.thumbnail.url : element.url ;
                        preview_html = '<div class="options-gallery-thumb" data-id="'+element.id+'"><img src="'+preview_img+'" /></div>';
                        image_div.append(preview_html);
                        return e.id;
                    });
                    image_div.append('<div class="clearfix"></div>');
                    image_div.addClass('options-gallery-images-has-children');
                    input.val(ids.join(',')).trigger('input');
                    $.acm.gallery.sortable();
    
                });
                
                
                return false;
            });
        },
        sortable: function(){
            $('.options-gallery-images').each(function(){
                $(this).sortable({
                    update : function(event, ui){
                        var _ids = $(this).sortable('toArray', {attribute: 'data-id'});
                        var parent = $(this).parent();
                        $('.options-gallery-ids', parent).val(_ids.join(','));
                    }
                });
            });
        }
    };
    
    $(document).on('fluent/create_fields', function(e, el){
		
		/*
        $(el).find('.field-type-gallery').each(function(){
			
			$.fluent.gallery.set({ $el : $(this) }).init();
			
		});
		*/
        $.fluent.gallery.init();
        $.fluent.gallery.sortable();
	});

    $(document).on('input', '.field-type-gallery input[type="hidden"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/gallery/value', function(id){
        return $('#field-'+id).find('input[type="hidden"]').first().val();
    });
    
})(jQuery);