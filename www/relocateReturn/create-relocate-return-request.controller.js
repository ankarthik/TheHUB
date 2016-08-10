/**
 * Created by karthik.an on 10/28/2015.
 */
(function(){
    "use strict";

    angular
        .module('app.relocateReturn')
        .controller('CreateRelocateReturnRequestCtrl', CreateRelocateReturnRequest);

    function CreateRelocateReturnRequest($scope,
                                         imageService,
                                         $stateParams,
                                         $filter,
                                         dataservice,
                                         config,
                                         $cordovaToast,
                                         $state,
                                         datepicker,
                                         $timeout,
                                         mixPanelConfig) {

        $scope.createrelocatereturnrequest = mixPanelConfig.MixPanelList.CreateRelocateReturnRequest.MixPanelEventLabel;

        dataservice.startLoader();
        $scope.CaseTypes = [];
        $scope.caseContainer = {};

        try {
            dataservice.querySoup('relocateReturnList', function (response) {
                $scope.objUnit = $filter('filter')(response.currentPageOrderedEntries[0].CaseList, {UnitNo: $stateParams.unitNo})[0];
            });
        } catch (e) {
            console.log('Error' + e);
        }

        dataservice.get("GetNeedHelpRelocateReturnCases", function(response){
            try {

                if(config.APIList["GetNeedHelpRelocateReturnCases"].isDataAvailable){
                    response = response.currentPageOrderedEntries[0].CaseTypeList;
                } else {
                    response = response.CaseTypeList;
                }

                var temp = $filter('filter')($filter('filter')(response, {Group: 'RETURN/RELOCATE'}), {TypeId: 1004});
                var caseTypes = [];
                caseTypes.push(temp[0]);
                caseTypes.push(temp[1]);
                temp = $filter('filter')($filter('filter')(response, {Group: 'RETURN/RELOCATE'}), {TypeId: 1003, SubCaseTypeId: 1003});
                caseTypes.push(temp[0]);

                $scope.CaseTypes = caseTypes;

                $scope.$apply();
            } catch(e) {
                console.error('Error occured while parsing equipments data - ' + e);
                $cordovaToast.showShortBottom(config.message.unexpectedError);
            } finally {
                dataservice.closeLoader();
            }
        });

        $scope.openDatepicker = function () {
            datepicker.getDate(function (date) {
                angular.element('#txtRequestedDate').val(date);
            });
        };

        $scope.images = [];
        $scope.attachImage = function () {
            imageService.attachImage($scope.images);
        };

        $scope.deleteImage = function () {
            $scope.images.pop();
        };

        $scope.submitRequest = function () {
            try {
                dataservice.startLoader();
                var userSelectedCaseId = null;
                var group = document.getElementsByName("orders");
                console.log(group);
                for (var i=0; i<group.length; i++) {
                    if (group[i].checked){
                        userSelectedCaseId = $scope.CaseTypes[i].SubCaseTypeId;
                        break;
                    }
                }

                if(userSelectedCaseId == null || userSelectedCaseId == undefined){
                    $cordovaToast.showShortBottom(config.message.createServiceSubTypeErr);
                    dataservice.closeLoader();
                    return false;
                }

                var requestedDate = angular.element('#txtRequestedDate').val();
                if (requestedDate == '') {
                    $cordovaToast.showShortBottom(config.message.createServiceDateErr);
                    dataservice.closeLoader();
                    return false;
                } else {
                    var date = requestedDate.split('-');
                    var newDate = date[2] + '-' + date[0] + '-' + date[1];
                }

                var selectedCase = $scope.caseContainer.selectedCase;

                if (selectedCase == null) {
                    var objCase = $filter('filter')($scope.CaseTypes, {SubCaseTypeId: userSelectedCaseId})[0];
                } else {
                    var objCase = selectedCase;
                }

                console.log('Unit object: ' + JSON.stringify($scope.objUnit));

                var imageBase64 = '';

                if ($scope.images.length > 0) {
                    var imgSrc = $scope.images[0].src;
                    imageBase64  = imgSrc.split(',')[1].trim();
                }

                var serviceRequest = {};
                serviceRequest.CaseDetails = {
                    RequestedDate: newDate,
                    UploadedImage: imageBase64,
                    UnitNo: $scope.objUnit.UnitNo,
                    SiteContactPhone: '',
                    SiteContactName: '',
                    SiteContactEmail: '',
                    Notes: angular.element('#txtComments').val(),
                    LeaseContactPhone: "",
                    LeaseContactName: "",
                    LeaseContactEmail: "",
                    LeaseContactCellphone: "",
                    ContractNo: $scope.objUnit.LeaseNo,
                    ContactType: "",
                    CaseTypeName: objCase.Name,
                    CaseTypeId: objCase.TypeId,
                    CaseSubTypeId: objCase.SubCaseTypeId,
                    BranchNumber: $scope.objUnit.BranchCode
                }

                console.log('ServiceRequest object: ' + JSON.stringify(serviceRequest));

                dataservice.post("/AddEditCases", serviceRequest, function (response) {
                    try {

                        mixpanel.track($scope.createrelocatereturnrequest, {"ENV": mixPanelConfig.MixPanelEnvironment} );

                        console.log('Response for POST AddEditCases: ' + JSON.stringify(response));
                        var objRes = JSON.parse(response);
                        var errorMsg = objRes.CaseResult.SaveResult.ErrorMessage;
                        if (errorMsg !== null && errorMsg.trim() === '') {
                            $cordovaToast.showLongBottom(config.message.createServiceSuccess + objRes.CaseResult.CaseId);

                            $scope.objUnit.CaseId = objRes.CaseResult.CaseId;
                            $scope.objUnit.RequestedDate = serviceRequest.CaseDetails.RequestedDate + "T00:00:00";
                            $scope.objUnit.ClosedDate = "0001-01-01T00:00:00";
                            $scope.objUnit.CommittedDate = "0001-01-01T00:00:00";
                            $scope.objUnit.CompletedDate = "0001-01-01T00:00:00";
                            $scope.objUnit.CommittedTime = "";
                            $scope.objUnit.CaseType = objCase.Name;
                            $scope.objUnit.CaseSubType = objCase.SubCaseTypeName;

                            dataservice.updateSoup('RelocateReturn', $scope.objUnit);

                            dataservice.closeLoader();

                            $scope.$apply();

                            $timeout(function () {
                                $state.go('relocateReturn');
                            }, 1000);

                        } else {
                            dataservice.closeLoader();
                            $cordovaToast.showShortBottom(errorMsg);
                        }
                    } catch (e) {
                        dataservice.closeLoader();
                        console.error('Error in POST AddEditCases: ' + e);
                    }
                });
            } catch(ex) {
                dataservice.closeLoader();
                console.error(ex);
                $cordovaToast.showShortBottom(config.message.unexpectedErrorr);
            }
        }
    }
})();