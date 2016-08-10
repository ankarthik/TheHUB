/**
 * Created by om.choudhary on 23-09-15.
 */
(function(){
    'use strict';

    angular
        .module('app.forgotSomething')
        .controller('ForgotSomethingCtrl', function($scope, dataservice, $filter, $cordovaToast, config, $timeout, $ionicLoading, $state, mixPanelConfig) {

            $scope.forgotsomethingdetails = mixPanelConfig.MixPanelList.ForgotSomethingDetails.MixPanelEventLabel;
            $scope.forgotsomethingrequest = mixPanelConfig.MixPanelList.ForgotSomethingRequest.MixPanelEventLabel;
            dataservice.startLoader();

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
                    }

                    $scope.deliveries = [];                    

                    if (response.CaseList === undefined) {
                        $scope.deliveries = [];
                    } else {
                        $scope.deliveries = $filter('filter')(response.CaseList, function(value, index, array) {
                            if ( value.CompletedDate == '0001-01-01T00:00:00' && value.CaseId !== -1){
                                return true;
                            }
                            else if (moment(value.CompletedDate).isValid()) {
                                return false;
                            } else {
                                return false;
                            }
                        }, true);
                
                        dataservice.get("ForgotSomethingGetItemsList", function(fsList){
                            try {

                                if(config.APIList["ForgotSomethingGetItemsList"].isDataAvailable){
                                    fsList = fsList.currentPageOrderedEntries[0];
                                } else {
                                    fsList = fsList;
                                }

                                angular.forEach($scope.deliveries, function (delivery, key) {
                                    var newFSListItem = [];
                                    angular.forEach(fsList.FSItemsList.FSItems, function (item, i) {
                                        var objItem = {};
                                        objItem.Id =  delivery.UnitNo + '_' + item.Id;
                                        objItem.Name = item.Name;
                                        objItem.IsChecked  = false;

                                        newFSListItem.push(objItem);
                                    });
                                    delivery.ItemsToAdd = newFSListItem;
                                });

                                console.log(JSON.stringify($scope.deliveries));
                            } catch(e) {
                                console.log('Error : ', e);
                            }
                        });
                    }
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
                console.log('Error in Forgot Something Controller :' + error);
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

            $scope.submitRequest = function (unitNo, leaseNo) {
                try {
                    $ionicLoading.show();
                    var delivery = $filter('filter')($scope.deliveries, {UnitNo: unitNo})[0];
                    console.log('Submit Request for Unit: ' + JSON.stringify(delivery));

                    var checkedLength = 0,
                        FSList = {},
                        itemsRequested = [],
                        objSelection = {
                            "UnitNo": unitNo,
                            "leaseNo": leaseNo
                        };

                    FSList.ForgotSomethingList = [];


                    angular.forEach(delivery.ItemsToAdd, function (value, key) {
                        if (value.IsChecked) {
                            itemsRequested.push(value.Name);
                            checkedLength++;
                        }
                    });

                    if (checkedLength > 0) {
                        console.log('Checked length: ' + checkedLength);
                        objSelection.ItemsRequested = itemsRequested.toString();
                        FSList.ForgotSomethingList.push(objSelection);

                        dataservice.post("/ForgotSomething", FSList, function (response) {
                            try {
                                var ut = new Date();
                                var url_time  = JSON.stringify(ut.getTime());
                                mixpanel.track(mixPanelConfig.MixPanelList.ForgotSomethingRequest.MixPanelEventLabel, {"url_time": url_time, "ENV": mixPanelConfig.MixPanelEnvironment} );

                                console.log('Response for POST ForgotSomething: ' + response);
                                if (response.ResultCode === 0) {
                                    console.log('Response.ResultCode: ' + response.ResultCode);
                                    $cordovaToast.showShortBottom(config.message.forgotSomethingSuccess);
                                    $timeout(function () {
                                        $scope.shownGroup = null;
                                        $state.go('forgotSomething');
                                    }, 1500);
                                } else {
                                    console.error(response.ErrorMessage);
                                    $cordovaToast.showShortBottom(config.message.unexpectedError);
                                }
                            } catch (e) {
                                console.log('Error in POST ForgotSomething: ' + e);
                                $cordovaToast.showShortBottom(config.message.unexpectedError);
                            }
                        });

                    } else {
                        dataservice.closeLoader();
                        console.log('None of the checked');
                        $cordovaToast.showShortBottom(config.message.requiredSelection);
                    }
                } catch (ex) {
                    $cordovaToast.showShortBottom(config.error.unexpectedError);
                }
            };

        });
})();