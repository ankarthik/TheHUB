(function(){
    'use strict';

    angular.module('app.myDelivery')
        .controller('MyDeliveryCtrl', function($scope, $http, dataservice, utility, delivery, config, $cordovaToast, mixPanelConfig) {

            $scope.deliverydetails = mixPanelConfig.MixPanelList.DeliveryDetails.MixPanelEventLabel;
            $scope.dialfromdetails = mixPanelConfig.MixPanelList.DialFromDetails.MixPanelEventLabel;
            $scope.reviewinspectionchecklist = mixPanelConfig.MixPanelList.ReviewInspectionChecklist.MixPanelEventLabel;

            dataservice.startLoader();

            $scope.deliveries = {};

            dataservice.get("ForgotSomethingAndMyDelivery", function(response){
                try {
                    console.log('/GetDeliveryDetails: ', response);

                    if (response === undefined) {
                        console.error('The app has encountered an unknown error.');
                        $cordovaToast.showShortBottom(config.message.unexpectedError);
                        return;
                    }

                    if ( config.APIList["ForgotSomethingAndMyDelivery"].isDataAvailable ) {
                        response = response.currentPageOrderedEntries[0];
                    } else {
                        response = response;
                    }

                    $scope.deliveries = [];

                    angular.forEach(response.CaseList, function(value, key) {
                        if((value.ClosedDate == '0001-01-01T00:00:00' || !moment(value.ClosedDate).isValid()) && value.CaseId !== -1){
                            this.push(value);
                        } else {
                            var closedDate = moment(value.ClosedDate).format('YYYY-MM-DD');

                            var currentDate = moment().format('YYYY-MM-DD'),
                                newClosedDate = moment(moment(closedDate).add(31, 'days')).format('YYYY-MM-DD');

                            if ( moment(currentDate).isBefore(newClosedDate) && value.CaseId !== -1) {
                                this.push(value);
                            } else {

                            }
                        }
                    }, $scope.deliveries);

                    if ( $scope.deliveries.length < 1 ) {
                        angular.element('#div_noRecords').removeClass('hide');
                    }
                } catch(e) {
                    console.log('Error : ', e);
                    $cordovaToast.showShortBottom(config.message.unexpectedError);
                } finally {
                    dataservice.closeLoader();
                }
            }, function (error) {
                dataservice.closeLoader();
                console.log('Error in My Delivery Controller :' + error);
            });

            $scope.toggleGroup = function(d) {
                if ($scope.isGroupShown(d)) {
                    $scope.shownGroup = null;
                } else {
                    $scope.shownGroup = d;
                }
            };

            $scope.isGroupShown = function(d) {
                return $scope.shownGroup === d;
            };

            $scope.isValidDate = function (value) {
                if (value === '0001-01-01T00:00:00') {
                    return false;
                }
                return moment(new Date(value)).isValid();
            };
            $scope.getFormattedDate = function (value) {
                if ($scope.isValidDate(value)) {
                    return (value.split("T", 1))[0].split("-", 3)[1] + '/' + (value.split("T", 1))[0].split("-", 3)[2];
                }
                return '';
            };
            $scope.getFormattedTime = function (value) {
                if ($scope.isValidDate(value)) {
                    return (value.split("T", 1))[0].split("-", 3)[1] + '/' + (value.split("T", 1))[0].split("-", 3)[2];
                }
                return '';
            };

            $scope.dialNumber = function (number) {
                utility.dialNumber(number);
            };


            $scope.isDisplayableDelivery = function (closedDate) {
                if ( closedDate == '0001-01-01T00:00:00' ){
                    return true;
                }

                if (!moment(closedDate).isValid()) {
                    return true;
                }
                closedDate = moment(closedDate).format('YYYY-MM-DD');

                var currentDate = moment().format('YYYY-MM-DD'),
                    newClosedDate = moment(moment(closedDate).add(31, 'days')).format('YYYY-MM-DD');

                console.log('in isDisplayableDelivery, current date: {0}, new closed date {1}', currentDate, newClosedDate);

                if (moment(currentDate).isBefore(newClosedDate)) {
                    return true;
                } else {
                    return false;
                }
            };


            $scope.isOBInspectionEnable = function (closedDate) {
                if ( closedDate == '0001-01-01T00:00:00' ){
                    return true;
                }

                if (!moment(closedDate).isValid()) {
                    return false;
                }

                closedDate = moment(closedDate).format('YYYY-MM-DD');

                var currentDate = moment().format('YYYY-MM-DD'),
                    newClosedDate = moment(moment(closedDate).add(5, 'days')).format('YYYY-MM-DD');

                console.log('is isOBInspectionEnable, current date: {0}, new closed date {1}', currentDate, newClosedDate);

                if (moment(currentDate).isBefore(newClosedDate)) {
                    return true;
                } else {
                    return false;
                }
            };
        });
})();