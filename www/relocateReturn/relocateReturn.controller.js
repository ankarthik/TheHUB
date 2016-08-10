
(function(){
    'use strict';

    angular
        .module('app.relocateReturn')
        .controller('RelocateReturnCtrl', RelocateReturn);

    function RelocateReturn($scope, dataservice, utility, config, $cordovaToast, $filter, $ionicPopup, mixPanelConfig) {

        $scope.returnrelocatedetails = mixPanelConfig.MixPanelList.RelocateReturnDetails.MixPanelEventLabel;
        $scope.newrelocaterequest = mixPanelConfig.MixPanelList.NewRelocateReturnRequest.MixPanelEventLabel;
        $scope.dialfromdetails = mixPanelConfig.MixPanelList.DialFromDetails.MixPanelEventLabel;

        dataservice.startLoader();

        $scope.equipments = [];

        dataservice.get("RelocateReturn", function(response){

            try {
                if (response === undefined) {
                    console.error('The app has encountered an unknown error.');
                    $cordovaToast.showShortBottom(config.message.unexpectedError);
                    return;
                }

                if(config.APIList["RelocateReturn"].isDataAvailable){
                    response = response.currentPageOrderedEntries[0];
                } else {
                    response = response;
                }
                var orderedCaseList = $filter('orderBy')(response.CaseList, 'UnitNo');

                var lastUnitNo = null;
                var unit = {};
                angular.forEach(orderedCaseList, function (item, key) {
                    var serviceCase  = {
                        "SalesPersonPhone": item.SalesPersonPhone,
                        "SalesPersonName": item.SalesPersonName,
                        "RequestedDate": item.RequestedDate,
                        "OutForDeliveryDate": item.OutForDeliveryDate,
                        "ETA": item.ETA,
                        "CompletedTime": item.CompletedTime,
                        "CompletedETA": item.CompletedETA,
                        "CompletedDate": item.CompletedDate,
                        "CommittedDate": item.CommittedDate,
                        "ClosedDate": item.ClosedDate,
                        "CaseType": item.CaseType,
                        "CaseSubType": item.CaseSubType,
                        "CaseStatus": item.CaseStatus,
                        "CaseId": item.CaseId
                    }

                    if (lastUnitNo !== null && lastUnitNo !== item.UnitNo) {
                        $scope.equipments.push(unit);
                        unit = {};
                    }

                    if (lastUnitNo === null || lastUnitNo !== item.UnitNo) {
                        unit = {
                            "WorkOrderStatus": item.WorkOrderStatus,
                            "WorkOrderId": item.WorkOrderId,
                            "VendorNo": item.VendorNo,
                            "VendorName": item.VendorName,
                            "VendorId": item.VendorId,
                            "ServiceCenter": item.ServiceCenter,
                            "UnitType": item.UnitType,
                            "UnitNo": item.UnitNo,
                            "UnitClass": item.UnitClass,
                            "LeaseNo": item.LeaseNo,
                            "LeaseEndDate": item.LeaseEndDate,
                            "InspectionId": item.InspectionId,
                            "BranchCode": item.BranchCode,
                            "DeliveryZipcode": item.DeliveryZipcode,
                            "DeliveryState": item.DeliveryState,
                            "DeliveryCity": item.DeliveryCity,
                            "DeliveryAddress": item.DeliveryAddress,
                            "Delivered": item.Delivered,
                            "ContractState": item.ContractState,
                            "CustomerNo": item.CustomerNo,
                            "CustomerName": item.CustomerName,
                            "CustomerId": item.CustomerId,
                            "Cases": []
                        }
                        unit.Cases.push(serviceCase);
                    } else {
                        unit.Cases.push(serviceCase);
                    }

                    lastUnitNo = item.UnitNo;

                    if (key === (orderedCaseList.length - 1)) {
                        $scope.equipments.push(unit);
                    }
                });
                console.log('Ordered & grouped RR cases:  ' + JSON.stringify($scope.equipments));

                if ($scope.equipments.length < 1) {
                    angular.element('#div_noRecords').removeClass('hide');
                }

            } catch(e) {
                console.error('Error : ' + e.message);
                $cordovaToast.showShortBottom(config.message.unexpectedError);
            } finally {
                $scope.$apply();
                dataservice.closeLoader();
            }
        }, function (error) {
            dataservice.closeLoader();
            console.log('Error in Relocate Return Controller :' + error);
        });

        $scope.toggleGroup = function(d) {
            if(d.ContractState !== "Complete Activated"){
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: config.message.relocateReturnActivatedContractMsg
                });

                alertPopup.then(function(res) {
                });
            } else {
                if ($scope.isGroupShown(d)) {
                    $scope.shownGroup = null;
                } else {
                    $scope.shownGroup = d;
                }
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
        }

        $scope.getFormattedDate = function (value) {
            if ($scope.isValidDate(value)) {
                return (value.split("T", 1))[0].split("-", 3)[1] + '/' + (value.split("T", 1))[0].split("-", 3)[2];
            }
            return '';
        }

        $scope.dialNumber = function (number) {
            utility.dialNumber(number);
        }
    }
})();