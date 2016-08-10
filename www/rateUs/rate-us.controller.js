/**
 * Created by karthik.an on 11/2/2015.
 */
(function(){
    'use strict';

    angular
        .module('app.rateUs')
        .controller('RateUsCtrl', RateUs);

    function RateUs($scope, dataservice, $cordovaToast, config, $ionicPopup, $rootScope, mixPanelConfig) {

        $scope.takesurvey = mixPanelConfig.MixPanelList.TakeSurvey.MixPanelEventLabel;

        dataservice.startLoader();

        dataservice.get("RateUsInfo", function (response) {
            try {
                if (response === undefined) {
                    $cordovaToast.showShortBottom(config.error.unexpectedError);
                    return false;
                }

                if (config.APIList["RateUsInfo"].isDataAvailable) {
                    $scope.rateUsList = response.currentPageOrderedEntries[0];
                } else {
                    $scope.rateUsList = response;
                    $rootScope.count = response.length;
                }

                dataservice.apply();

                if ($scope.rateUsList.length < 1) {
                    angular.element('#div_noRecords').removeClass('hide');
                }

            } catch (e) {
                console.error('Error : ', e);
                $cordovaToast.showShortBottom(e.message);
            } finally {
                $scope.$apply();
                dataservice.closeLoader();
            }
        });

        $scope.getFormattedDate = function (value) {
            return (value.split("T", 1))[0].split("-", 3)[1] + '/' + (value.split("T", 1))[0].split("-", 3)[2];
        };

        $scope.pageRedirect = function (rateUsObj) {
            config.APIList["RateUsInfo"].isDataAvailable = false;
            dataservice.startLoader();
            dataservice.get("RateUsInfo", function (response) {
                try {
                    if (response === undefined) {
                        $cordovaToast.showShortBottom(config.error.unexpectedError);
                        return false;
                    }

                    if (config.APIList["RateUsInfo"].isDataAvailable) {
                        $scope.rateUsList = response.currentPageOrderedEntries[0];
                    } else {
                        $scope.rateUsList = response;
                        $rootScope.count = response.length;
                    }

                    if ($scope.rateUsList.length < 1) {
                        angular.element('#div_noRecords').removeClass('hide');
                    } else {
                        var flag = false;
                        angular.forEach($scope.rateUsList, function (object) {
                            if (object.Id === rateUsObj.Id) {
                                flag = true;
                            }
                        });

                        if (flag) {
                            window.open(rateUsObj.FeedbackURL__c, '_system', 'location=yes');
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '',
                                template: config.message.rateUsSurveyCompletedMsg
                            });

                            alertPopup.then(function(res) {
                            });
                        }
                    }

                } catch (e) {
                    console.error('Error : ', e);
                    $cordovaToast.showShortBottom(e.message);
                } finally {
                    $scope.$apply();
                    dataservice.closeLoader();
                }
            });
        };
    }
})();