/**
 * Created by om.choudhary on 08-10-15.
 */
(function(){

    "use strict";

    //angular
    //    .module('app.outboundInspection', ['ngRoute'])
    //    .config( function($routeProvider){
    //        $routeProvider
    //            .when('/outboundInspection', {
    //                templateUrl : 'myDelivery/outboundInspection/outboundInspection.html',
    //                controller  : 'OutboundInspectionCtrl'
    //        })
    //            .when('/outboundInspection/leaseNo/:leaseNo/units/:units/location/:location', {
    //                templateUrl : 'myDelivery/outboundInspection/outboundInspection.html',
    //                controller  : 'OutboundInspectionCtrl'
    //            });
    //    });

    angular
        .module('app.outboundInspection')
        .config(function($stateProvider) {
            $stateProvider
                .state('outboundInspection', {
                    url: '/outbound-inspection/:inspectionId',
                    templateUrl : 'myDelivery/outboundInspection/outboundInspection.html',
                    controller  : 'OutboundInspectionCtrl'
                });
        });
})();