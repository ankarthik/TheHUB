/**
 * Created by om.choudhary on 23-09-15.
 */
(function(){
    'use strict';

    /*angular
        .module('app.forgotSomething',['ngRoute'])
        .config( function($routeProvider){

            $routeProvider
                .when('/forgotSomething', {
                    templateUrl : 'forgotSomething/forgotSomething.html',
                    controller: 'ForgotSomethingCtrl'
                });
        });
*/
    angular
        .module('app.forgotSomething')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('forgotSomething', {
                    url: '/forgot-something',
                    templateUrl : 'forgotSomething/forgotSomething.html',
                    controller: 'ForgotSomethingCtrl'
                });
        });
})();