(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $.fluent.filter = {

        filters: {},

        add: function (tag, filter) {
            (this.filters[tag] || (this.filters[tag] = [])).push(filter);
        },

        apply: function (tag, val) {
            if(this.filters[tag]){
                var filters = this.filters[tag];
                for(var i = 0; i < filters.length; i++){
                    val = filters[i](val);
                    if(val === false){
                        break;
                    }
                }
            }
            return val;
        }
    };
    
    $.fluent.is_clone_field = function( input )
	{
		if( input.attr('name') && input.attr('name').indexOf('-clone##]') != -1 )
		{
			return true;
		}
		
		return false;
	};
    
    $.fluent.layout = function() {

        if(fluent.context == 'page' || fluent.context == 'meta'){
        
            $('.wrap').addClass($('.options-layout-input:checked').val());
            
            $(document).on('click', '.options-layout-input', function(){
                var options_layout = $('.options-layout-input:checked').val();
                $.post(ajaxurl, {
                    action: 'options_save_layout',
                    options_layout: options_layout,
                    page: pagenow,
                    screenoptionnonce: $('#screenoptionnonce').val()
                });
                if(options_layout == 'options-normal'){
                    $('.wrap').addClass('options-normal').removeClass('options-block');
                }else{
                    $('.wrap').addClass('options-block').removeClass('options-normal');
                }
            });

        }
        
    };

    $.fluent.restore = function() {
        $(document).on('click', '.options-restore-default', function(){
            $.fluent.proccess_required = false;
            
            if(!confirm(fluent.L10n.warning_defaults)){
                return false;
            }
            
            var input = $('<input>').attr('type', 'hidden').attr('name', 'restore-defaults').val('true');
            $('.wrap form').append($(input)).submit();
            $.fluent.proccess_required = true;
            return false;
        });
    };

    $.fluent.passes = true;

    $.fluent.proccess_required = true;
    
    $.fluent.required = function() {
        
        $(document).on('submit', 'form', function(){
            if($.fluent.proccess_required === false){
                return;
            }
            $.fluent.passes = true;
            $(document).trigger('fluent/pre_validate');
            $.each(fluent.required, function( id, data ){
                $(document).trigger('fluent/validate/'+data.type, [id, data]);
            });
            $(document).trigger('fluent/post_validate');

            if($.fluent.passes !== true){
                $('#publish.button-primary-disabled').removeClass('button-primary-disabled');
                $('#publishing-action .spinner').hide();
                $(document).trigger('fluent/validation_failed');
                $('tr.options-required input').first().focus();
                return false; 
            }
            $(document).trigger('fluent/validation_passed');
        });
        
    };
    
    $.fluent.required_postboxes = function() {
        
        if($('.postbox').length > 0){
            $('.postbox').each(function(){
                if($(this).find('tr.options-required').length > 0){
                    $(this).find('h3.hndle').addClass('options-required');
                }else{
                    $(this).find('h3.hndle').removeClass('options-required');
                }
            });
        }
        
    };

    $.fluent.conditionals = function() {

        $(document).on('fluent/field/change', function(e, el){
            var changed_field = $(el).closest('tr');
            $.each(fluent.conditionals, function(index, conditional){
                var conditional_field = $('tr#field-'+index);

                //dont proccess ourself
                if(conditional_field.attr('id') == changed_field.attr('id')){
                    return;
                }

                //or loop
                var $globalshow = false;
                $.each(conditional, function(inx, cond){
                    //and loop
                    var $show = true;
                    $.each(cond, function(_index, _cond){
                        //hide if conditional is hidden
                        if($('tr#field-'+_cond.id).hasClass('condition-failed')){
                            $show = false;
                            return false;
                        }
                        var val = null;
                        val = $.fluent.filter.apply('fluent/field/'+_cond.field_type+'/value', _cond.id);
                        //console.log(_cond.id+':'+val);
                        if($.fluent.filter.apply('fluent/validate/'+_cond.type, {value: _cond.value, supplied: val}) === false){
                            $show = false;
                        }
                    });
                    if($show === true){
                        $globalshow = true;
                        return false;
                    }
                    $show = false;
                });

                if($globalshow === false){
                    conditional_field.closest('tr').fadeOut().addClass('condition-failed');
                }else{
                    $globalshow = false;
                    conditional_field.closest('tr').fadeIn().removeClass('condition-failed');
                }
            });
        });

        //trigger field change on basic field changes - specific triggers added via field js
        $(document).on('input change', 'input', function(){
            $(document).trigger('fluent/field/change', $(this));
        });
        
    };
    
    $(document).ready(function() {
        
        //add field layout options
        $.fluent.layout();
        
        //add toggles to options pages
        if(fluent.context == 'page'){
            
            //make meta boxes function correctly
            postboxes.add_postbox_toggles(pagenow);
            
            //add restore action for pages
            $.fluent.restore();
        }
        
        //run validation
        $.fluent.required();

        //run conditions
        $.fluent.conditionals();
        
        $(document).on('fluent/validation_failed', function(){
            $.fluent.required_postboxes();
        });
        
        //hide spinner and show fields on creation
        $(document).on('fluent/created_fields', function(){
            $('.options-spinner').each(function(){
                $(this).fadeOut('fast', function(){
                    $(this).closest('div').find('.options-table').fadeIn();
                    $(this).closest('div').find('.options-section-locked,.options-field-locked').fadeIn();
                }); 
            });
        });

        $(document).on('click', '.options-tabs-tabs > a', function(){
            if($(this).hasClass('active')){
                return false;
            }
            var target = $(this).attr('data-tab');
            var container = $(this).closest('.inside');
            container.find('.options-tabs-tabs a.active').removeClass('active');
            $(this).addClass('active');
            container.find('.options-tabs-tables .options-tab.active').removeClass('active');
            container.find('.options-tabs-tables .options-tab#'+target).addClass('active');
            return false;
        });
        
        //field vallidation
        $(document).on('fluent/validate/text fluent/validate/password fluent/validate/email fluent/validate/url fluent/validate/number fluent/validate/textarea fluent/validate/date fluent/validate/media fluent/validate/gallery', function(e, id, data){
            var msg = data.msg;
            if(!$.trim($('.options-table #' + id).val()).length){
                if(!$('.options-table #' + id).closest('tr').hasClass('options-required')){
                    $('.options-table #' + id).closest('tr').addClass('options-required');
                    $('.options-table #' + id).closest('td').append('<p class="description options-error">'+msg+'</p>');
                }
                $.fluent.passes = false;
            }
            $(document).on('input', '.options-table #' + id, function(){
                if($.trim($(this).val()).length > 0){
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

        $(document).on('fluent/validate/checkbox', function(e, id, data){
            var msg = data.msg;
            if(!$('.options-table #field-' + id + ' input[type="checkbox"]:checked').length){
                if(!$('.options-table #field-' + id + ' input[type="checkbox"]').closest('tr').hasClass('options-required')){
                    $('.options-table #field-' + id + ' input[type="checkbox"]').closest('tr').addClass('options-required');
                    $('.options-table #field-' + id + ' input[type="checkbox"]').closest('td').append('<p class="description options-error">This is a required field!</p>');
                }
                $.fluent.passes = false;
            }
            $(document).on('change', '.options-table #field-' + id + ' input[type="checkbox"]', function(){
                if($('input[type="checkbox"]:checked', $(this).closest('td')).length > 0){
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

        $(document).on('fluent/validate/editor', function(e, id, data){
            var msg = data.msg;
            if(typeof(tinyMCE) == "object"){
                tinyMCE.triggerSave();
                var eid = $('#field-' + id).find('.wp-editor-area').attr('id'),
                    editor = tinyMCE.get( eid );
                if( editor && !editor.getContent() ){
                    if(!$('.options-table #' + id).closest('tr').hasClass('options-required')){
                        $('.options-table #' + id).closest('tr').addClass('options-required');
                        $('.options-table #' + id).closest('td').append('<p class="description options-error">'+msg+'</p>');
                    }
                    $.fluent.passes = false;
                }
            }
        });
        
    });
    
    //trigger create fields after 10 milliseconds
    $(window).load(function(){
        
        setTimeout(function(){
            // setup fields
            $(document).trigger('fluent/create_fields', [ $('.wrap') ]);
            // after setup
            $(document).trigger('fluent/created_fields', [ $('.wrap') ]);
            $(document).trigger('fluent/field/change', [ $('.wrap') ]);

            $('.wrap').find('.options-tabs-tabs,.options-section-description').fadeIn();
            $('.wrap').find('.options-tabs-tabs a').first().addClass('active');
            $('.wrap').find('.options-tabs-tables .options-tab').first().addClass('active');
            
        }, 10);
        
    });

    
})(jQuery);