/**
 * Created by om.choudhary on 23-09-15.
 */
(function(){
    'use strict';

    angular
        .module('app.myDelivery')
        .config(function($stateProvider) {
            $stateProvider

                .state('myDelivery', {
                    url: '/my-delivery',
                    templateUrl : 'myDelivery/myDelivery.html',
                    controller: 'MyDeliveryCtrl'
                });
        });

})();