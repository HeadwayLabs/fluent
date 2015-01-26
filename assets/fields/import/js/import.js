/**
 * Import Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};
    
    $.fluent.import = {
        
        $el: null,
        $frame: null,
        
        set: function( o ){
            $.extend( this, o );
            return this;
        },
        
        init: function(){
            $(document).on('click', '.field-type-import .upload', function(){
                
                var el = $(this).closest('.field-type-import');
                
                var fluent_import_frame = wp.media({
                    className: 'media-frame fluent-media-frame',
                    frame: 'select',
                    multiple: false,
                    title: $(this).attr('data-title'),
                    library: {
                        type: 'application/wpds'
                    },
                    button: {
                        text:  $(this).attr('data-select')
                    }
                });
                
                fluent_import_frame.on('select', function(){
                    var file = fluent_import_frame.state().get('selection').first().toJSON();
                    fluent_import_frame.close();

                    //submit form with import data
                    $.fluent.proccess_required = false;
                    $('#fluent-import-file').val(file.id);
                    $('.wrap form').submit();
                    $.fluent.proccess_required = true;
                    return false;

                });
        
                // Now that everything has been set, let's open up the frame.
                fluent_import_frame.open();
                
                return false;
            });
        }
    };
    
    $(document).on('fluent/create_fields', function(e, el){
		
        $.fluent.import.init();
		
	});

    $.fluent.filter.add('fluent/field/import/value', function(id){
        return false;
    });
    
})(jQuery);