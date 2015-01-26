(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('change', '.field-type-select select', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/select/value', function(id){
        return $('#field-'+id).find('select').first().val();
    });

    $(document).on('fluent/created_fields', function(){
        $(".options-table .selectize").selectize({
            plugins: ['remove_button'],
            delimiter: ',',
            persist: false,
            create: function(input) {
                return {
                    value: input,
                    text: input
                };
            },
            onChange: function(value){
                $(document).trigger('fluent/field/change');
            }
        });
    });

})(jQuery);