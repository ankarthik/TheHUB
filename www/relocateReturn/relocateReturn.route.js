(function(){
    'use strict';

    angular
        .module('app.relocateReturn')
        .config(function($stateProvider) {
            $stateProvider

                .state('relocateReturn', {
                    url: '/relocate-return',
                    templateUrl : 'relocateReturn/relocateReturn.html',
                    controller: 'RelocateReturnCtrl'
                })
                .state('createRelocateReturnRequest', {
                    url: '/create-relocate-return-request/:unitNo',
                    templateUrl : 'relocateReturn/create-relocate-return-request.html',
                    controller: 'CreateRelocateReturnRequestCtrl'
                });
        });
})();