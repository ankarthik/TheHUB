(function() {
    'use strict';
    angular
        .module('app.home')
        .config(function($stateProvider, $urlRouterProvider){
              $urlRouterProvider.when("", "/home");
            $stateProvider

                .state('home', {
                    url: '/home',
                    templateUrl: 'home/home.html',
                    controller: 'HomeCtrl'
                })
                .state('/', {
                    url: '/home',
                    templateUrl: 'home/home.html',
                    controller: 'HomeCtrl'
                });
        });

})();