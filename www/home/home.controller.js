(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeCtrl', Home);

    function Home($scope, mixPanelConfig) {

        $scope.myequipment = mixPanelConfig.MixPanelList.MyEquipment.MixPanelEventLabel;
        $scope.forgotsomething = mixPanelConfig.MixPanelList.ForgotSomething.MixPanelEventLabel;
        $scope.mydelivery = mixPanelConfig.MixPanelList.MyDelivery.MixPanelEventLabel;
        $scope.needhelp = mixPanelConfig.MixPanelList.NeedHelp.MixPanelEventLabel;
        $scope.relocatereturn = mixPanelConfig.MixPanelList.RelocateReturn.MixPanelEventLabel;
        $scope.futureneeds = mixPanelConfig.MixPanelList.FutureNeeds.MixPanelEventLabel;
        $scope.rateus = mixPanelConfig.MixPanelList.RateUs.MixPanelEventLabel;

        try {
            angular.element('#back-image').each(function() {
                angular.element(this).load(function () {
                    var imageWidth = angular.element('#back-image').width();
                    var imageHeight = angular.element('#back-image').height();

                    angular.element('#menu-icon1').css({'top': .0188*imageHeight, 'left': .03*imageWidth});
                    angular.element('#menu-icon2').css({'top': .1006*imageHeight, 'left': .3197*imageWidth});
                    angular.element('#menu-icon3').css({'top': .2515*imageHeight, 'left': .5202*imageWidth});
                    angular.element('#menu-icon4').css({'top': .4402*imageHeight, 'left': .5845*imageWidth});
                    angular.element('#menu-icon5').css({'top': .6268*imageHeight, 'left': .5202*imageWidth});
                    angular.element('#menu-icon6').css({'top': .7735*imageHeight, 'left': .3197*imageWidth});
                    angular.element('#menu-icon7').css({'top': .8637*imageHeight, 'left': .03*imageWidth});

                    angular.element('.circle').css({'height': .0985*imageHeight});
                    angular.element('#hub-logo').css({'height': .1236*imageHeight, 'top': .4423*imageHeight, 'display': 'block'});

                    if(imageHeight > 500){
                        angular.element('.menu-items > span').css({'font-size': '16px'});
                    }
                });
            });
        } catch (e) {
            console.log('Error: ' + e);
        }
    }

})();

