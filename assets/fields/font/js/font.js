/**
 * Font Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};
    
    $.fluent.font = {

        color: {
        
            $el: null,
            
            set: function( o ){
                $.extend( this, o );
                return this;
            },
            
            init: function(){
                if($.fluent.is_clone_field(this.$el)){
                    return false;
                }
                $(this.$el).wpColorPicker({
                    change: _.throttle(function() {
                        $(this).trigger( 'change' );
                    }, 1000)
                });
            }
        },
        family: {
             $el: null,

             $instance: null,
            
            set: function( o ){
                $.extend( this, o );
                return this;
            },
            
            init: function(){
                if($.fluent.is_clone_field(this.$el)){
                    return false;
                }

                var select = $(this.$el).selectize({
                    options: fluent_font,
                    valueField: 'name',
                    labelField: 'name',
                    optgroupLabelField: 'label',
                    optgroupField: 'optgroup',
                    optgroups: [
                        {value: 'native', label: 'Native Fonts'},
                        {value: 'google', label: 'Google Fonts'}
                    ],
                    searchField: ['name'],
                    create: false,
                    render: {
                        option: function(item, escape) {
                            name = item.name.replace(/\'/g, '');
                            var gfamily = (item.optgroup == 'google' ? ' data-gfamily="'+item.family+'"' : '');
                            return '<div class="option" style="font-family: ' + escape(item.name) +' !important;"'+gfamily+'>' + escape(name.split(",")[0]) +'</div>';
                        },
                        item: function(item, escape) {
                            name = item.name.replace(/\'/g, '');
                            return '<div class="item" style="font-family: ' + escape(item.name) +' !important;">' + escape(name.split(",")[0]) +'</div>';
                        }
                    },
                    onChange: function(value){
                        //this - contains the option object
                        $(document).trigger('fluent/field/font/preview', $(this.$el).closest('.field-type-font'));
                        $(document).trigger('fluent/field/change');
                    }
                });

                this.$instance = select.selectize;


                $(document).on('change input', '#'+$(this.$el).closest('.field-type-font').closest('tr').attr('id')+' input,'+'#'+$(this.$el).closest('.field-type-font').closest('tr').attr('id')+' select', function(){
                    $(document).trigger('fluent/field/font/preview', $(this).closest('.field-type-font'));
                });

            }
        },
        loadremote: function(element){

            var drop = $(element).closest('.selectize-control');

            $('.item[data-gfamily]:not(.loaded)', drop).each(function(index, el){
                if(index > 3){return false;}
                var gfont = $(el).attr('data-gfamily');
                if(gfont !== '' && $.inArray(gfont, $.fluent.font.loadedgfonts) === -1){
                    $('<link>').attr('rel','stylesheet').attr('type','text/css').attr('href','//fonts.googleapis.com/css?family='+gfont.replace(/ /g, '+')).appendTo('head');
                    $.fluent.font.loadedgfonts.push(gfont);
                    $(el).addClass('loaded');
                }
            });

            $('.option[data-gfamily]:not(.loaded)', drop).each(function(index, el){
                if(index > 3){return false;}
                var gfont = $(el).attr('data-gfamily');
                if(gfont !== '' && $.inArray(gfont, $.fluent.font.loadedgfonts) === -1){
                    $('<link>').attr('rel','stylesheet').attr('type','text/css').attr('href','//fonts.googleapis.com/css?family='+gfont.replace(/ /g, '+')).appendTo('head');
                    $.fluent.font.loadedgfonts.push(gfont);
                    $(el).addClass('loaded');
                }
            });

        },
        loadedgfonts: []
    };

    $(document).on('fluent/created_fields', function(){
        setTimeout(function(){
            $('.selectize-control').each(function(){
                $.fluent.font.loadremote($(this).find('.item').first());
            });
        }, 1000);
    });

    $(document).on('fluent/field/font/preview', function(){
        var family = $('select.font-family', this).val();
        var color = $('input[type="text"].color', this).val();
        var height = $('input[type="text"].line-height', this).val();
        var size = $('input[type="text"].font-size', this).val();
        var units = $('input[type="hidden"].units', this).val();
        $('.font-preview', this).css({
            'font-family': family,
            'color': color,
            'line-height': height+units,
            'font-size': size+units
        });
    });

    $(document).on('mouseenter', '.field-type-font .font-family .option', function(){
        $.fluent.font.loadremote($(this));
    });

    $(document).on('click', '.field-type-font .bg-switcher', function(){
        if($(this).hasClass('active')){
            $(this).closest('.font-preview').css({background: '#f9f9f9'});
            $(this).removeClass('active');
        }else{
            $(this).closest('.font-preview').css({background: '#333'});
            $(this).addClass('active');
        }
    });
    
    $(document).on('fluent/create_fields', function(e, el){
		
		$(el).find('.field-type-font input[type="text"].color').each(function(){
			
			$.fluent.font.color.set({ $el : $(this) }).init();
			
		});
        $(el).find('.field-type-font select.font-family').each(function(){

            $.fluent.font.family.set({ $el : $(this) }).init();

        });
	});

    $(document).on('input', '.field-type-font input[type="text"].color', function(){
        $(document).trigger('fluent/field/change', $(this));
    });

    $.fluent.filter.add('fluent/field/font/value', function(id){
        return $('#field-'+id).find('select').first().val();
    });

    $(document).on('fluent/validate/font', function(e, id, data){

        var msg = data.msg;
    
        if(!$.trim($('.options-table #' + id).val()).length){
            if(!$('.options-table #' + id).closest('tr').hasClass('options-required')){
                $('.options-table #' + id).closest('tr').addClass('options-required');
                $('.options-table #' + id).closest('td').append('<p class="description options-error">'+msg+'</p>');
            }
            $.fluent.passes = false;
        }
        
        $(document).on('click', '.options-table #field-' + id + ' *', function(){
            var input = $('select', $(this).closest('td'));
            if($.trim($(input).val()).length > 0){
                if($(this).closest('tr').hasClass('options-required')){
                    $(this).closest('tr').removeClass('options-required');
                    $('p.options-error', $(this).closest('td')).remove();
                }
            }else{
                if(!$(this).closest('tr').hasClass('options-required')){
                    $(this).closest('tr').addClass('options-required');
                    $(this).closest('td').append('<p class="description options-error">'+msg+'</p>');
                }
            }
        });
        
    });
    
})(jQuery);