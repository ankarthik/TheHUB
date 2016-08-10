
(function(){
    'use strict';

    angular.module('app.userProfile')
        .controller('UserProfileCtrl', function($scope, config, $cordovaToast, dataservice) {
            dataservice.startLoader();
            dataservice.get("UserInfo", function(response){
                try {
                    if (response === undefined) {
                        $cordovaToast.showShortBottom(config.error.unexpectedError);
                        return false;
                    }

                    $scope.userInfo = [];

                    if ( config.APIList["UserInfo"].isDataAvailable ) {
                        $scope.userInfo.push( response.currentPageOrderedEntries[0] );
                    } else {
                        $scope.userInfo.push( response );
                    }

                    dataservice.apply();

                } catch(e) {
                    console.log('Error : ', e);
                    $cordovaToast.showShortBottom(config.message.unexpectedError);
                } finally {
                    $scope.$apply();
                    dataservice.closeLoader();
                }
            }, function (error) {
                dataservice.closeLoader();
                console.log('Error in User Profile Controller :' + error);
            });

        });
})();