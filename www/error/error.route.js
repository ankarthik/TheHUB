(function() {
    'use strict';

    angular
        .module('app.error', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
                .otherwise({
                    templateUrl : 'error/error.html',
                    controller  : 'ErrorCtrl'
                });
        });
})();