/**
 * Created by om.choudhary on 08-10-15.
 */
(function(){
    "use strict";

    angular
        .module('app.outboundInspection')
        .controller('OutboundInspectionCtrl', OutboundInspection);

    function OutboundInspection($scope,
                                $state,
                                $stateParams,
                                $timeout,
                                $filter,
                                dataservice,
                                delivery,
                                $ionicPopup,
                                utility,
                                config,
                                $cordovaToast,
                                $ionicLoading,
                                mixPanelConfig) {

        $scope.submitinspectionchecklist = mixPanelConfig.MixPanelList.SubmitInspectionChecklist.MixPanelEventLabel;

        dataservice.startLoader();

        config.APIList["GetOutboundInspectionDetails"].parameterToSend.inspectionId = $stateParams.inspectionId;

        try {
            dataservice.querySoup('forgotSomethingAndMyDeliveryList', function (response) {
                    $scope.deliveryCase = $filter('filter')(response.currentPageOrderedEntries[0].CaseList, {InspectionId: $stateParams.inspectionId})[0];
                },
                function (error) {
                    console.log('Error :' + error);
                });

            dataservice.querySoup('userInfo', function (response) {
                    $scope.userInfo = response.currentPageOrderedEntries[0];
                },
                function (error) {
                    console.log('Error : ' + error);
                });
        } catch (e) {
            console.log('Error :' + e);
        }

        dataservice.get("GetOutboundInspectionDetails", function(response){
            try {
                dataservice.startLoader();
                if (response === undefined) {
                    console.error('The app has encountered an unknown error.');
                    $cordovaToast.showShortBottom(config.message.unexpectedError);
                    return;
                }

                if(config.APIList["GetOutboundInspectionDetails"].isDataAvailable ) {
                    response = response.currentPageOrderedEntries[0];
                } else {
                    response = response;
                }

                var data = $filter('orderBy')(response.OBInspection, 'CheckListCategoryId');

                $scope.checkList = [];
                $scope.unitNo = response.OBInspection[0].UnitNo;
                if (response.OBInspection.length < 1) {
                    angular.element('#div_noRecords').removeClass('hide');
                } else {
                    angular.element('.user-signature').removeClass('hide');
                }

                var lastCheckListCatId = null;
                angular.forEach(data, function (value, key) {

                    if (lastCheckListCatId === null || lastCheckListCatId !== value.CheckListCategoryId) {
                        var item = {
                            'UnitClass': value.UnitClass,
                            'CheckListCategoryId': value.CheckListCategoryId,
                            'CheckListCategory': (value.CheckListCategory).toLowerCase(),
                            'InspectedBy': value.InspectedBy,
                            'InspectionComments': value.InspectionComments,
                            'CheckListItem': []
                        }
                        $scope.checkList.push(item);
                        lastCheckListCatId = value.CheckListCategoryId;
                    }

                    var CheckListItem = {
                        'CheckListItemId': value.CheckListItemId,
                        'CheckListItem': value.CheckListItem,
                        'CheckListValueId': value.CheckListValueId,
                        'CheckListValue': value.CheckListValue
                    };
                    $scope.$apply();
                    $scope.checkList[$scope.checkList.length - 1].CheckListItem.push(CheckListItem);
                });
                dataservice.closeLoader();
            } catch(e) {
                console.log('Error : ', e);
                $cordovaToast.showShortBottom(config.message.unexpectedError);
                dataservice.closeLoader();
                $state.go('myDelivery');
            }
        }, function (error) {
            dataservice.closeLoader();
            console.log('Error in Need Help Controller :' + error);
        });

        $scope.chkLegalAcceptance = false;

        $scope.submitSignature = function () {
            try {
                $ionicLoading.show();
                console.log('Checkbox values is :' + $scope.chkLegalAcceptance);

                if (!$scope.chkLegalAcceptance) {
                    $cordovaToast.showShortBottom('Please agree to the conditions.');
                    dataservice.closeLoader();
                    return false;
                }

                if (utility.replaceNullToString(angular.element('#txtSignature').val()) == '') {
                    $cordovaToast.showShortBottom('Please type your name.');
                    dataservice.closeLoader();
                    return false;
                }

                console.log(JSON.stringify($scope.deliveryCase));

                var data = {
                    CheckList: $scope.checkList,
                    CustomerNo: utility.replaceNullToString($scope.deliveryCase.CustomerNo),
                    CustomerName: utility.replaceNullToString($scope.deliveryCase.CustomerName),
                    LeaseNo: utility.replaceNullToString($scope.deliveryCase.LeaseNo),
                    UnitNo: utility.replaceNullToString($scope.deliveryCase.UnitNo),
                    CaseId: utility.replaceNullToString($scope.deliveryCase.CaseId),
                    InspectionId: utility.replaceNullToString($scope.deliveryCase.InspectionId),
                    UserName: $scope.userInfo.Name,
                    UserEmail: $scope.userInfo.Email,
                    CustomerSignature: utility.replaceNullToString(angular.element('#txtSignature').val()),
                    InspectedBy: utility.replaceNullToString($scope.checkList[0].InspectedBy),
                    InspectionComments: utility.replaceNullToString($scope.checkList[0].InspectionComments),
                    CustomerComments: utility.replaceNullToString(angular.element('#txtComment').val())
                };

                console.log(JSON.stringify(data));

                dataservice.post("/PostOBInspectionChecklist", data, function (response) {
                    try {

                        mixpanel.track($scope.submitinspectionchecklist, {"ENV": mixPanelConfig.MixPanelEnvironment} );

                        console.log('Response for PostOBInspectionChecklist: ' + response);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Success',
                            content: 'Thank you for accepting delivery of your building.'
                        });
                        alertPopup.then(function (res) {
                            $state.go('myDelivery');
                        });

                    } catch (e) {
                        console.log('Error in PostOBInspectionChecklist: ' + e);
                        $cordovaToast.showShortBottom(config.message.unexpectedError);
                    }
                });
            } catch (ex) {
                console.log('Error :' + ex);
                $cordovaToast.showShortBottom(config.message.unexpectedError);
            }
        }

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
    }
})();


