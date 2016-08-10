/**
 * Created by karthik.an on 11/2/2015.
 */
(function(){
    'use strict';

    angular
        .module('app.rateUs')
        .config(function($stateProvider) {
            $stateProvider

                .state('rateUs', {
                    url: '/rate-us',
                    templateUrl : 'rateUs/rate-us.html',
                    controller: 'RateUsCtrl'
                });
        });
})();