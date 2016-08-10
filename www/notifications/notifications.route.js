(function(){
    'use strict';

    angular
        .module('app.notifications')
        .config(function($stateProvider) {
            $stateProvider

                .state('notifications', {
                    url: '/notifications',
                    templateUrl : 'notifications/notifications.html',
                    controller: 'NotificationsCtrl'
                });
        });

})();