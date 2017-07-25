angular.module('starter.directives', ['ionic'])
.filter('maskcpf', ["$filter", function ($filter) {
    return function (input, mask) {
        var retVal = "";
        if(!input) return "";
        retVal = input.substr(0, 2) + '.' + 
            input.substr(2, 3) + '.' + input.substr(5, 3) + '/' + 
              input.substr(8,4) + "-" + input.substr(12,2);
        return retVal;
    };
}]).filter('maskcep', ["$filter", function ($filter) {
    return function (input, mask) {
        var retVal = "";
        if(!input) return "";
        retVal = input.substr(0, 5) + '-' + 
            input.substr(5, 3);
        return retVal;
    };
}]);