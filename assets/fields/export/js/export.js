/**
 * Export Field
 */
(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    $(document).on('click', '.field-type-export a', function(){
        window.location.href = fluent.ajax_url+'?action=fluent_export&type='+fluent.context+'&option='+fluent.option_name+'&rel_id='+fluent.rel_id+'&_wpnonce='+fluent.nonce;
        return false;
    });
    
})(jQuery);