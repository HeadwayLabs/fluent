(function($) {
    'use strict';
    
    $.fluent = $.fluent || {};

    //required
    $.fluent.filter.add('fluent/validate/required', function(obj){
        if(obj.supplied === ''){
            return false;
        }
    });

    //equals
    $.fluent.filter.add('fluent/validate/==', function(obj){
        if(obj.value !== obj.supplied){
            return false;
        }
    });

    //nequal
    $.fluent.filter.add('fluent/validate/!=', function(obj){
        if(obj.value === obj.supplied){
            return false;
        }
    });

    //contains
    $.fluent.filter.add('fluent/validate/contains', function(obj){
        if(obj.supplied.indexOf(obj.value) === -1){
            return false;
        }
    });

    //!contains
    $.fluent.filter.add('fluent/validate/!contains', function(obj){
        if(obj.supplied === '' || obj.supplied.indexOf(obj.value) >= 0){
            return false;
        }
    });

    //starts with
    $.fluent.filter.add('fluent/validate/starts_with', function(obj){
        if(obj.supplied.slice(0, obj.value.length) !== obj.value){
            return false;
        }
    });

    //ends with
    $.fluent.filter.add('fluent/validate/ends_with', function(obj){
        if(obj.supplied.slice(-obj.value.length) !== obj.value){
            return false;
        }
    });

    //more than
    $.fluent.filter.add('fluent/validate/>', function(obj){
        if(obj.supplied === '' || parseInt(obj.supplied) <= parseInt(obj.value)){
            return false;
        }
    });

    //more than or equal to
    $.fluent.filter.add('fluent/validate/>=', function(obj){
        if(obj.supplied === '' || parseInt(obj.supplied) < parseInt(obj.value)){
            return false;
        }
    });

    //less than or equal to
    $.fluent.filter.add('fluent/validate/<=', function(obj){
        if(obj.supplied === '' || parseInt(obj.supplied) > parseInt(obj.value)){
            return false;
        }
    });

    //less than
    $.fluent.filter.add('fluent/validate/<', function(obj){
        if(obj.supplied === '' || parseInt(obj.supplied) >= parseInt(obj.value)){
            return false;
        }
    });

    //between
    $.fluent.filter.add('fluent/validate/between', function(obj){
        var values = obj.value.split('|');
        if(obj.supplied === '' || parseInt(obj.supplied) < parseInt(values[0])){
            return false;
        }
        if(parseInt(obj.supplied) > parseInt(values[1])){
            return false;
        }
    });

    //not between
    $.fluent.filter.add('fluent/validate/!between', function(obj){
        var values = obj.value.split('|');
        if(obj.supplied === '' || parseInt(obj.supplied) > parseInt(values[0]) && parseInt(obj.supplied) < parseInt(values[1])){
            return false;
        }
    });

})(jQuery);