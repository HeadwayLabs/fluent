(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('input', '.field-type-url input[type="url"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/url/value', function(id){
        return $('#field-'+id).find('input[type="url"]').first().val();
    });

})(jQuery);