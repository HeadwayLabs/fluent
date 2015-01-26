/**
 * Switch Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};
    
    $.fluent.media = {
        
        $el: null,
        $frame: null,
        
        set: function( o ){
            $.extend( this, o );
            return this;
        },
        
        init: function(){
            $(document).on('click', '.field-type-media .upload', function(){
                
                //var avm_media_frame;
                
                var el = $(this).closest('.field-type-media');
                
                var fluent_media_frame = wp.media({
                    className: 'media-frame avm-media-frame',
                    frame: 'select',
                    multiple: false,
                    title: $(this).attr('data-title'),
                    library: {
                        //type: 'image'
                    },
                    button: {
                        text:  $(this).attr('data-select')
                    }
                });
                
                fluent_media_frame.on('select', function(){
                    // Grab our attachment selection and construct a JSON representation of the model.
                    var media_attachment = fluent_media_frame.state().get('selection').first().toJSON();
                    
                    //get the preview
                    var thumbSrc = media_attachment.url;
                    if (typeof media_attachment.sizes !== 'undefined' && typeof media_attachment.sizes.thumbnail !== 'undefined') {
                        thumbSrc = media_attachment.sizes.thumbnail.url;
                    } else if ( typeof media_attachment.sizes !== 'undefined' ) {
                        var height = media_attachment.height;
                        for (var key in media_attachment.sizes) {
                            var object = media_attachment.sizes[key];
                            if (object.height < height) {
                                height = object.height;
                                thumbSrc = object.url;
                            }
                        }
                    } else {
                        thumbSrc = fluent_media.file_icon;//media_attachment.icon;
                    }
                    
                    
                    
                    $('.options-media-id', el).val(media_attachment.id).trigger('input');
                    $('.options-media-thumb > img', el).attr('src', thumbSrc);
                    $('.options-media-thumb > .options-media-edit', el).attr('href', media_attachment.editLink);
                    $('.upload', el).fadeOut('slow', function(){
                        $('.options-media-thumb', el).fadeIn();
                    });
                    fluent_media_frame.close();
                });
        
                // Now that everything has been set, let's open up the frame.
                fluent_media_frame.open();
                
                return false;
            });
            
            $(document).on('click', '.field-type-media .options-media-remove', function(){
                $(this).parent().fadeOut('slow', function(){
                    $(' img', this).attr('src', '');
                    var parent = $(this).parent();
                    $('.options-media-id', parent).val('').trigger('input');
                    $(' .upload', parent).fadeIn();
                });
                return false;
            });
            /*
            $('.field-type-media .options-media-edit').live('click', function(event){
                
                event.preventDefault();
                
                var parent = $(this).parent();
                var id = $('.options-media-id', parent).val();
                
                avm_media_frame = wp.media({
                    title		:	'edit file',
                    multiple	:	false,
                    button		:	{ text : 'update' }
                });
                
                avm_media_frame.on('open',function() {
                    
                    // set to browse
                    avm_media_frame.content.mode('browse');
                    
                    //avm_media_frame.$el.closest('.media-modal').addClass('acf-media-modal acf-expanded');
                        
                    
                    // set selection
                    var selection	=	avm_media_frame.state().get('selection');
                    var attachment = wp.media.attachment(id);
                    attachment.fetch();
                    selection.add( attachment );
                            
                });
                
                avm_media_frame.on('close',function(){
                
                    // remove class
                    //avm_media_frame.$el.closest('.media-modal').removeClass('acf-media-modal acf-expanded');
                    
                });
                
                avm_media_frame.open();
                
                return false;
            });
            */
        }
    };
    
    $(document).on('fluent/create_fields', function(e, el){
		
		/*
        $(el).find('.field-type-media').each(function(){
			
			$.fluent.media.set({ $el : $(this) }).init();
			
		});
        */
        $.fluent.media.init();
		
	});

    $(document).on('input', '.field-type-media input[type="hidden"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/media/value', function(id){
        return $('#field-'+id).find('input[type="hidden"]').first().val();
    });
    
})(jQuery);