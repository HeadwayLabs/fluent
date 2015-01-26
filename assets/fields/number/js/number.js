(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('input', '.field-type-number input[type="number"]', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/number/value', function(id){
        return $('#field-'+id).find('input[type="number"]').first().val();
    });

})(jQuery);