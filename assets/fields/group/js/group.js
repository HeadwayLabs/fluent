/**
 * Group Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};
    
    $.fluent.group = {
        $el: null,
        
        set: function( o ){
            $.extend( this, o );
            return this;
        },
        
        init: function(){
            
        },
        sortable: function(){
            $('.options-group-table > tbody').sortable({
                containment: "parent",
                handle: ".options-group-move",
                helper: function(e, tr){
                    var $originals = tr.children();
                    var $helper = tr.clone();
                    $helper.children().each(function(index)
                    {
                      // Set helper cell sizes to match the original sizes
                      $(this).width($originals.eq(index).width());
                    });
                    return $helper;
                }
            });
        },
        table_width: function(){
            $('.options-group-table').each(function(){
                var has_actions = $('> thead > tr > th.options-group-actions', $(this)).length;
                if(has_actions > 0){
                    var width = $(this).width() - 56;
                    $('> thead > tr > th:not(.options-group-actions)', $(this)).each(function(){
                        var pwidth = $(this).attr('data-width') - 20;
                        var nwidth = (width / 100) * pwidth;
                        $(this).css('width', Math.round(nwidth) + 'px');
                    });
                    width = null;
                }
            });
        },
        s4: function() {
          return Math.floor((1 + Math.random()) * 0x10000)
                     .toString(16)
                     .substring(1);
        },
        guid: function() {
          return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                 this.s4() + '-' + this.s4() + this.s4() + this.s4();
        }
    };
    
    $(document).on('click', '.options-group-add a', function(){
        var target = $(this).attr('data-id');
        var id = '#' + target + '-template';
        var re = new RegExp("##"+target+"-clone##","g");
        var clone = $(id).html().replace(re, 'i-'+$.fluent.group.guid());
        $('#options-group-table-'+target+' > tbody').append(clone);
        if($(this).attr('data-layout') == 'horizontal'){
            $(document).trigger('fluent/create_fields', $('#options-group-table-'+target+' > tbody tr:last-child'));
            $(document).trigger('fluent/created_fields', [ $('#options-group-table-'+target+' > tbody tr:last-child') ]);
        }else if($(this).attr('data-layout') == 'vertical'){

            $(document).trigger('fluent/create_fields', $('#options-group-table-'+target+' > tbody tr:last-child').find('table'));
            $(document).trigger('fluent/created_fields', [ $('#options-group-table-'+target+' > tbody tr:last-child').find('table') ]);
        }
        $.fluent.group.sortable();
        return false;
    });
    
    $(document).on('click', '.options-group-remove', function(){
        $(this).closest('tr').find('td').slideUp('slow', function(){
            $(this).parent().remove();
        });
        return false;
    });
    
    $(document).on('fluent/created_fields', function(e, el){
		$.fluent.group.sortable();
        //$.fluent.group.table_width();
	});
    
})(jQuery);