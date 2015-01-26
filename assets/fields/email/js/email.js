(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('input', '.field-type-email input[type="email"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/email/value', function(id){
        return $('#field-'+id).find('input[type="email"]').first().val();
    });

})(jQuery);