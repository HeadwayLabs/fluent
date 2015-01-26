(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('input', '.field-type-textarea textarea', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/textarea/value', function(id){
        return $('#field-'+id).find('textarea').first().val();
    });

})(jQuery);