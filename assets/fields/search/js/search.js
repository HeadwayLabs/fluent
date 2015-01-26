(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('change', '.field-type-search select', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/search/value', function(id){
        return $('#field-'+id).find('select').first().val();
    });

    $(document).on('fluent/created_fields', function(){
        $(".options-table .selectize-search").each(function(index){

            var valuefield = $(this).attr('data-value_key');
            var valuelabel = $(this).attr('data-value_label');

            $(this).selectize({
                valueField: valuefield,
                labelField: valuelabel,
                searchField: [valuelabel],
                options: [
                    {id:1,title:'test'},
                    {id:2,title:'test2'}
                ],
                create: false,
                onChange: function(value){
                    $(document).trigger('fluent/field/change');
                },
                load: function(query, callback) {
                    if (!query.length) return callback();
                    $.ajax({
                        url: $(this.$input[0]).attr('data-search_url'),
                        type: 'POST',
                        data: {
                            q: query,
                            source: $(this.$input[0]).attr('data-source_type'),
                            post_types: $(this.$input[0]).attr('data-post_types'),
                            roles: $(this.$input[0]).attr('data-roles'),
                            key: $(this.$input[0]).attr('data-value_key'),
                            label: $(this.$input[0]).attr('data-value_label')
                        },
                        error: function() {
                            console.log('search field error');
                            callback();
                        },
                        success: function(result) {
                            var res = $.parseJSON(result);
                            console.log(res);
                            callback(res);
                        }
                    });
                }
            });
        });
    });

})(jQuery);