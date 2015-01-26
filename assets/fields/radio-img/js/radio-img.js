(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('change click', '.field-type-radio-img *', function(){
		$(this).closest('td').find('label').removeClass('checked');
		$(this).closest('label').addClass('checked');
		$(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/radio-img/value', function(id){
        return $('#field-'+id).find('input[type="radio"]:checked').first().val();
    });

})(jQuery);