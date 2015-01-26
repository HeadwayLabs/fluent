(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('click', '.fluent-support-form a', function(){
		var form = $(this).closest('.fluent-support-form');
		form.find('.response ul li').fadeOut('slow', function(){$(this).remove();});
		form.find('img').fadeIn('slow', function(){
			$.post(form.find('#fluent-support-form-url').val(), $(':input', form).serialize(), function(response){
				var data = $.parseJSON(response);
				form.find('img').fadeOut('slow');
				form.find('.response ul').append('<li class="'+data.status+'"><p>'+data.message+'</p></li>');
				setTimeout(function(){
					form.find('.response ul li').fadeOut('slow', function(){$(this).remove();});
				}, 3000);
			});
		}).css('display', 'block');
        return false;
    });

})(jQuery);