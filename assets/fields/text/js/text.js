(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('input', '.field-type-text input[type="text"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/text/value', function(id){
        return $('#field-'+id).find('input[type="text"]').first().val();
    });

})(jQuery);