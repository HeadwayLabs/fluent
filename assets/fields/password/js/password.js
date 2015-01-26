(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('input', '.field-type-password input[type="password"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/password/value', function(id){
        return $('#field-'+id).find('input[type="password"]').first().val();
    });

})(jQuery);