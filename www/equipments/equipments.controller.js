(function(){
    'use strict';

    angular
        .module('app.equipments')
        .controller('EquipmentsCtrl', Equipments);

    function Equipments($scope, dataservice, $cordovaToast, config, mixPanelConfig) {

        $scope.equipmentdetails = mixPanelConfig.MixPanelList.EquipmentDetails.MixPanelEventLabel;

        dataservice.startLoader();

        dataservice.get("MyEquipments", function(response){
            try {
                if (response === undefined) {
                    console.error('The app has encountered an unknown error.');
                    $cordovaToast.showShortBottom(config.message.unexpectedError);
                    return;
                }

                if(config.APIList["MyEquipments"].isDataAvailable){
                    var equipments = response.currentPageOrderedEntries[0].equipments;
                } else {
                    var equipments = response.equipments;
                }

                angular.forEach(equipments, function (equipment) {
                    if(equipment.Restrooms !== null){
                        equipment.Restrooms = equipment.Restrooms + ' ';
                    }
                    if(equipment.Offices !== null){
                        equipment.Offices = equipment.Offices + ' ';
                    }
                });
                $scope.equipments = equipments;

                if ($scope.equipments.length < 1) {
                    angular.element('#div_noRecords').removeClass('hide');
                }
            } catch(e) {
                console.log('Error : ', e);
            } finally {
                $scope.$apply();
                dataservice.closeLoader();
            }
        });

        $scope.toggleGroup = function(d) {
            if ($scope.isGroupShown(d)) {
                $scope.shownGroup = null;
                //getAnimation($scope.shownGroup, d);
            } else {
                $scope.shownGroup = d;
                //getAnimation($scope.shownGroup, d);
            }
        };

        $scope.isGroupShown = function(d) {
            return $scope.shownGroup === d;
        };

        function getAnimation(shownGroup, obj) {
            var ele = angular.element('#pnl'+ obj.UnitNo);
            if (shownGroup === null) {

                ele.css({
                    'overflow': 'hidden',
                    'height': 'auto',
                    'transitionProperty': 'height',
                    'transitionDuration': '0.7s',
                    'transitionTimingFunction': 'ease-in-out'
                });
            } else {
                ele.css({
                    'height': '0px;',
                });
            }
        }
    }
})();
