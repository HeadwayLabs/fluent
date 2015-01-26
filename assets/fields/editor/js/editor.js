(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

        $(document).on('click keyup keydown focus', '.field-type-editor, .field-type-editor *', function(){
            $(document).trigger('fluent/field/change', $(this).closest('tr'));
            var eid = $(this).find('textarea.wp-editor-area').attr('id'),
                editor = tinyMCE.get( eid );

            if( editor){
                editor.save();
                //console.log('value:'+ editor.getContent());
            }
        });

    $.fluent.filter.add('fluent/field/editor/value', function(id){

        if( $('#field-'+id).find('textarea.wp-editor-area').length > 0 && typeof(tinyMCE) == "object"){

            var eid = $('#field-'+id).find('textarea.wp-editor-area').attr('id'),
                editor = tinyMCE.get( eid );

            if( editor){
                return editor.getContent({format : 'raw'});
            }
        }

        return $('#field-'+id).find('textarea.wp-editor-area').first().val();

    });


})(jQuery);