(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('change', '.field-type-checkbox input', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/checkbox/value', function(id){
        var val = [];
        if($('#field-'+id).find('input[type="checkbox"]').length > 1){
            $('#field-'+id).find('input[type="checkbox"]:checked').each(function(index, el){
                val.push($(el).attr('name').split('][').pop().slice(0, -1));
            });
        }else{
            $('#field-'+id).find('input[type="checkbox"]:checked').each(function(index, el){
                val.push($(el).val());
            });
        }
        return val.join('|');
    });

})(jQuery);