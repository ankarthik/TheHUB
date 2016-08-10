(function(){
    'use strict';

    angular
        .module('app.needHelp')
        .config(function($stateProvider) {
            $stateProvider

                .state('needHelp', {
                    url: '/need-help',
                    templateUrl : 'needHelp/needHelp.html',
                    controller: 'NeedHelpCtrl'
                })
                .state('createNewService', {
                    url: '/create-new-service/:unitNo',
                    templateUrl: 'needHelp/create-new-service.html',
                    controller: 'CreateNewServiceCtrl'
                })
                .state('serviceRequestForm', {
                    url: '/service-request-form/:unitNo?serviceId=',
                    templateUrl: 'needHelp/service-request-form.html',
                    controller: 'ServiceRequestFormCtrl'
                });
        });
})();