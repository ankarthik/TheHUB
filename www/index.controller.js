(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexCtrl', Index);

    function Index($scope, config, dataservice, utility, $cordovaToast, userInfo, $interval, $ionicPopup, $rootScope, mixPanelConfig) {
        $scope.modspaceNumber = '';

        ionic.Platform.ready(function(){
            dataservice.startLoader();
            activate();
            getAllData();
        });

    function activate () {
        $scope.notifications = mixPanelConfig.MixPanelList.Notifications.MixPanelEventLabel;
        $scope.profile = mixPanelConfig.MixPanelList.Profile.MixPanelEventLabel;
        $scope.hubhelp = mixPanelConfig.MixPanelList.HUBHelp.MixPanelEventLabel;
        $scope.faq = mixPanelConfig.MixPanelList.FAQ.MixPanelEventLabel;
        $scope.modspacewebsite = mixPanelConfig.MixPanelList.ModspaceWebsite.MixPanelEventLabel;

            try {
                dataservice.get("UserInfo", function (response) {
                        try {
                            if (response === undefined) {
                                $cordovaToast.showShortBottom(config.error.unexpectedError);
                                return false;
                            }

                            userInfo.saveUserInfo(response);

                            config.APIList["DeviceInfoUpdate"].parameterToSend.deviceId = device.uuid;
                            config.APIList["DeviceInfoUpdate"].parameterToSend.userId = response.Id;

                            var sd = new Date();
                            var start_time  = JSON.stringify(sd.getTime());
                            mixpanel.track(mixPanelConfig.MixPanelList.Login.MixPanelEventLabel, {"url_time": start_time, "ENV": mixPanelConfig.MixPanelEnvironment} );

                            dataservice.post("/DeviceContactMap", config.APIList['DeviceInfoUpdate'].parameterToSend, function (response) {
                                    try {
                                        if (response === undefined) {
                                            $cordovaToast.showShortBottom(config.error.unexpectedError);
                                            return false;
                                        }
                                    } catch (e) {
                                        console.log('Error : ', e);
                                        $cordovaToast.showShortBottom(config.message.unexpectedError);
                                    }
                                },
                                function (error) {
                                    console.log('Error :' + error);
                                });
                        } catch (e) {
                            console.log('Error : ', e);
                            $cordovaToast.showShortBottom(config.message.unexpectedError);
                        }
                    });


                dataservice.get("GlobalSetting", function (response) {
                        try {
                            if (config.APIList["GlobalSetting"].isDataAvailable) {
                                $scope.ModspaceNumber = response.currentPageOrderedEntries[0].GlobalList[0].ModspaceNumber;
                            } else {
                                $scope.ModspaceNumber = response.GlobalList[0].ModspaceNumber;
                            }
                            config.APIList['GlobalSetting'].APICalled = false;
                        } catch (e) {
                            console.log('Error : ', e);
                            config.APIList['GlobalSetting'].APICalled = false;
                            $cordovaToast.showShortBottom(e.message);
                        }
                    });
            } catch (e) {
                console.log('Error :' + e);
            } finally {
                dataservice.closeLoader();
            }
        }

        function getAllData () {
            try {
                dataservice.get("RateUsInfo", function (response) {
                    try {
                        if (response === undefined) {
                            $cordovaToast.showShortBottom(config.error.unexpectedError);
                            return false;
                        }
                        config.notificationCount = response.length;
                        $rootScope.count = response.length;

                        config.allowNotificationCountToTakeFromConfig = true;
                    } catch (e) {
                        console.error('Error : ', e);
                        $cordovaToast.showShortBottom(e.message);
                    }
                });

                dataservice.get("MyEquipments", function (response) {
                        try {
                            if (response === undefined) {
                                $cordovaToast.showShortBottom(config.error.unexpectedError);
                                return false;
                            }
                            config.APIList['MyEquipments'].APICalled = true;
                        } catch (e) {
                            console.log('Error : ', e);
                            $cordovaToast.showShortBottom(config.message.unexpectedError);
                        }
                    });

                dataservice.get("ForgotSomethingAndMyDelivery", function (response) {
                        try {
                            if (response === undefined) {
                                $cordovaToast.showShortBottom(config.error.unexpectedError);
                                return false;
                            }
                        } catch (e) {
                            console.log('Error : ', e);
                            $cordovaToast.showShortBottom(config.message.unexpectedError);
                        }
                    });

                dataservice.get("ForgotSomethingGetItemsList", function (response) {
                        try {
                            if (response === undefined) {
                                $cordovaToast.showShortBottom(config.error.unexpectedError);
                                return false;
                            }
                        } catch (e) {
                            console.log('Error : ', e);
                            $cordovaToast.showShortBottom(config.message.unexpectedError);
                        }
                    });

                dataservice.get("NeedHelp", function (response) {
                        try {
                            if (response === undefined) {
                                $cordovaToast.showShortBottom(config.error.unexpectedError);
                                return false;
                            }
                        } catch (e) {
                            console.log('Error : ', e);
                            $cordovaToast.showShortBottom(config.message.unexpectedError);
                        }
                    });

                dataservice.get("GetNeedHelpRelocateReturnCases", function (response) {
                        try {
                            if (response === undefined) {
                                $cordovaToast.showShortBottom(config.error.unexpectedError);
                                return false;
                            }
                        } catch (e) {
                            console.log('Error : ', e);
                            $cordovaToast.showShortBottom(config.message.unexpectedError);
                        }
                    });

                dataservice.get("RelocateReturn", function (response) {
                        try {
                            if (response === undefined) {
                                $cordovaToast.showShortBottom(config.error.unexpectedError);
                                return false;
                            }
                        } catch (e) {
                            console.log('Error : ', e);
                            $cordovaToast.showShortBottom(config.message.unexpectedError);
                        }
                    });
            } catch (e) {
                console.log('Error : ' + e);
            }
        }

        $interval(getAllData, 600000, 0);

        $scope.dialNumber = function(number) {
            angular.element('.menu').toggleClass('swipe');
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                template: config.message.dialNumberMsg
            });

            confirmPopup.then(function(res) {
                if (res) {
                    var ed = new Date();
                    var end_time  = JSON.stringify(ed.getTime());
                    mixpanel.track(mixPanelConfig.MixPanelList.DialFromBar.MixPanelEventLabel, {"dial_time": end_time, "ENV": mixPanelConfig.MixPanelEnvironment} );
                    utility.dialNumber(number);
                } else {

                }
            });
        };

        $scope.logout = function () {
            dataservice.logout();
            angular.element('.menu').toggleClass('swipe');
        };

        $scope.menuShow = function () {
            angular.element('.menu').addClass('swipe');
        };

        $scope.menuHide = function () {
            angular.element('.menu').removeClass('swipe');
        };

        $scope.menuToggle = function () {
            angular.element('.menu').toggleClass('swipe');
        };
    }

})();