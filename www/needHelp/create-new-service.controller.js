/**
 * Created by karthik.an on 10/27/2015.
 */
(function(){
    "use strict";

    angular
        .module('app.needHelp')
        .controller('CreateNewServiceCtrl', CreateNewService);

    function CreateNewService($scope, dataservice, caseTypeService, $stateParams, config, $cordovaToast, $cordovaNetwork, $filter) {

        dataservice.startLoader();

        $scope.CaseTypes = [];
        $scope.unitNo = $stateParams.unitNo;
        console.log('UnitNo on create-new-service: ' + $scope.unitNo);

        dataservice.get("GetNeedHelpRelocateReturnCases", function(response){
            try {
                if (response === undefined) {
                    console.error('The app has encountered an unknown error.');
                    $cordovaToast.showShortBottom(config.message.unexpectedError);
                    return;
                }

                if(config.APIList["GetNeedHelpRelocateReturnCases"].isDataAvailable){
                    $scope.CaseTypes = $filter('filter')(response.currentPageOrderedEntries[0].CaseTypeList, {Group: 'NEED HELP'});
                } else {
                    $scope.CaseTypes = $filter('filter')(response.CaseTypeList, {Group: 'NEED HELP'});
                }
            } catch(e) {
                console.error('Error occured while parsing equipments data - ' + e);
                $cordovaToast.showShortBottom(config.message.unexpectedError);
            } finally {
                $scope.$apply();
                dataservice.closeLoader();
            }
        }, function (error) {
            dataservice.closeLoader();
            console.log('Error in Create New Service Controller :' + error);
        });

        if ($scope.CaseTypes.length < 1) {
            angular.element('#div_noRecords').removeClass('hide');
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