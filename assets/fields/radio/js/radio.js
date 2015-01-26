(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('change', '.field-type-radio input[type="radio"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/radio/value', function(id){
        return $('#field-'+id).find('input[type="radio"]:checked').first().val();
    });

})(jQuery);