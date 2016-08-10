/**
 * Created by karthik.an on 11/16/2015.
 */
(function(){
    'use strict';

    angular
        .module('app.userProfile')
        .config(function($stateProvider) {
            $stateProvider

                .state('userProfile', {
                    url: '/user-profile',
                    templateUrl : 'userProfile/user-profile.html',
                    controller: 'UserProfileCtrl'
                });
        });

})();