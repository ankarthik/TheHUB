(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    function dataservice($http, $ionicLoading, config, $cordovaToast, $cordovaNetwork, $timeout, $ionicPopup, $rootScope, $state, mixPanelConfig) {

        var service = {};

        service.startTime = function () {
            var st = new Date();
            var start_time  = JSON.stringify(sts.getTime());
            mixpanel.track("Requested for " + url, {"url_time":start_time, "ENV": mixPanelConfig.MixPanelEnvironment} );
        };

        service.get = function(key, successCallback, errorCallback) {
            if ( config.APIList[key].APICalled == false || config.APIList[key].APICalled == "Called" ) {
                if (config.APIList[key].isDataAvailable && config.allowCache) {
                    try {
                        console.log('API Calling from local storage');
                        service.querySoup(config.APIList[key].soupName, successCallback, errorCallback);
                    } catch (e) {
                        console.log('Error :' + e);
                    }
                } else {
                    if($cordovaNetwork.isOnline()) {
                        config.APIList[key].APICalled = "Calling";
                        console.log('API Calling from SalesForce');
                        service.getFromSalesForce(key, successCallback, errorCallback);
                    } else {
                        service.closeLoader();
                        $cordovaToast.showShortBottom(config.message.networkNotAvailable);
                    }
                }
            } else {
                if (config.APIList[key].APICalled == true) {
                    console.log('API Calling from Salesforce');
                    service.getFromSalesForce(key, successCallback, errorCallback);
                } else {
                    service.closeLoader();
                    var confirmPopup = $ionicPopup.alert({
                        title: '',
                        template: 'Please wait while your data is getting loaded'
                    });

                    confirmPopup.then(function(res) {
                        $state.go('home');
                    });
                }
            }
        };

        service.post = function (url, data, successCallback, errorCallback) {
            service.startLoader();
            if($cordovaNetwork.isOnline()) {
                console.log('URL: ' + url);
                console.log('Data: ' + JSON.stringify(data));
                if (errorCallback == null) {
                    errorCallback = function (err) {
                        console.log('Error occurred while invoking ' + url + ' - ' + JSON.stringify(err));
                        service.closeLoader();
                        $cordovaToast.showShortBottom(err.message);
                    }
                }

                var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");
                oauthPlugin.getAuthCredentials(
                    function (creds) {

                        var forceClient = new forcetk.Client(creds.clientId, creds.loginUrl);
                        forceClient.setSessionToken(creds.accessToken, "v33.0", creds.instanceUrl);
                        forceClient.setRefreshToken(creds.refreshToken);
                        forceClient.apexrest(url, "POST", JSON.stringify(data), null,
                            function (response) {
                                try {
                                    console.log('Response for ' + url + ': ' + response);
                                    $ionicLoading.hide();
                                    successCallback(response);
                                } catch (e) {
                                    console.error('Error: ' + e);
                                    $cordovaToast.showShortBottom(e.message);
                                }
                            },
                            function (error) {
                                $ionicLoading.hide();
                                console.log('Error occurred while invoking ' + url + ' - ' + error);
                                errorCallback(error);
                            });
                    }, function (error) {
                        $ionicLoading.hide();
                        console.log('Error in calling API: ', error);
                        errorCallback({'success': false, 'error': error});
                    }
                );
            } else {
                $cordovaToast.showShortBottom(config.message.networkNotAvailable);
            }
        };

        service.getFromSalesForce = function (key, successCallback, errorCallback) {
            try {
                console.log('URL: ' + config.APIList[key].api);
                if (errorCallback == null) {
                    errorCallback = function (err) {
                        var ed = new Date();
                        var end_time  = JSON.stringify(ed.getTime());
                        mixpanel.track(mixPanelConfig.MixPanelList.APICallFail.MixPanelEventLabel, {"url_time": end_time, "ENV": mixPanelConfig.MixPanelEnvironment, "url": config.APIList[key].api} );
                        console.log('Error occurred while invoking ' + config.APIList[key].api + ' - ' + JSON.stringify(err));
                        var errorMsg = (config.message.responseCode[err.status] === undefined ? config.message.unexpectedError : config.message.responseCode[err.status]);
                        $cordovaToast.showShortBottom(errorMsg);
                        // if session expired or invalid then user will redirect to login page
                        if (err.status === 401) {
                            $timeout(function () {
                                service.directLogout();
                            }, 300);
                        }
                    }
                }
            } catch (e) {
                console.log('Error :' + e);
            }

            if(config.APIList[key].parameterToSend !== null){
                if(config.APIList[key].parameterToSend.inspectionId !== undefined) {
                    var api = config.APIList[key].api + '' + config.APIList[key].parameterToSend.inspectionId;
                    var data = null;
                }
            } else {
                var api = config.APIList[key].api;
                var data = null;
            }

            var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");
            oauthPlugin.getAuthCredentials(
                function (creds) {
                    var forceClient = new forcetk.Client(creds.clientId, creds.loginUrl);
                    forceClient.setSessionToken(creds.accessToken, "v33.0", creds.instanceUrl);
                    forceClient.setRefreshToken(creds.refreshToken);
                    forceClient.apexrest(api, "GET", data, null,
                        function (response) {
                            console.log('Response for ' + config.APIList[key].api);

                            console.log(response);

                            if(config.APIList[key].soupName === null) {
                                config.APIList[key].APICalled = false;
                            }

                            if ( config.APIList[key].soupName !== null && response.Message === undefined && response.Exception === undefined && response.ErrorMessage === undefined) {
                                service.removeSoup(config.APIList[key].soupName);
                                service.registerAndUpsertSoup(key, JSON.parse(response));
                            }

                            successCallback(JSON.parse(response));
                        },
                        function (error) {
                            console.log('Error occurred while invoking ' + config.APIList[key].api + ' - ' + JSON.stringify(error));

                            if (error.status === 401 || error.statusText === "Unauthorized"){
                                service.directLogout();
                            }
                            config.APIList[key].isDataAvailable = false;
                            config.APIList[key].APICalled = false;
                            errorCallback(error);
                        });
                }, function (error) {
                    console.log('Error in calling API: ', error);
                    errorCallback(error);
                }
            );
        };

        service.logout = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                template: config.message.logoutMessage
            });

            confirmPopup.then(function(res) {
                if(res) {
                    var ed = new Date();
                    var end_time  = JSON.stringify(ed.getTime());
                    mixpanel.track(mixPanelConfig.MixPanelList.Logout.MixPanelEventLabel, {"url_time": end_time, "ENV": mixPanelConfig.MixPanelEnvironment} );
                    var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");
                    oauthPlugin.logout();
                }
            });
        };

        service.directLogout = function () {
            var ed = new Date();
            var end_time  = JSON.stringify(ed.getTime());
            mixpanel.track(mixPanelConfig.MixPanelList.Logout.MixPanelEventLabel, {"url_time": end_time, "ENV": mixPanelConfig.MixPanelEnvironment} );
            var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");
            oauthPlugin.logout();
        };

        service.notification = function (successCallback, errorCallback) {

            $ionicLoading.show();

            var oauthPlugin = cordova.require("com.salesforce.plugin.oauth");
            oauthPlugin.getAuthCredentials(
                function (creds) {
                    var forceClient = new forcetk.Client(creds.clientId, creds.loginUrl);
                    forceClient.setSessionToken(creds.accessToken, "v33.0", creds.instanceUrl);
                    forceClient.setRefreshToken(creds.refreshToken);
                    cordova.require("com.salesforce.util.push").registerPushNotificationHandler(
                        function(message) {
                            console.log(message["payload"]);
                            return message["payload"];
                        },
                        function(error) {
                            return error;
                        } );
                }, function (error) {
                    console.log('Error in calling API: ', error);
                    errorCallback(error);
                }
            );
        };

        service.registerAndUpsertSoup = function (key, data){
            if(config.APIList[key].soupName === 'userInfo' || config.APIList[key].soupName === 'rateUsInfo') {
                var indexSpec = [
                    {"path":"Id","type":"string"}
                ];
            } else if (config.APIList[key].soupName === 'needHelpRelocateReturnCases') {
                var indexSpec = [
                    {"path":"TypeId","type":"number"},
                    {"path":"SubCaseTypeId","type":"number"},
                    {"path":"SubCaseTypeName","type":"string"}
                ];
            } else {
                var indexSpec = [
                    {"path":"UnitNo","type":"string"}
                ];
            }

            navigator.smartstore.registerSoup(config.APIList[key].soupName, indexSpec, function(soupName) {
                console.log("Soup " + soupName + " was successfully created");
                try{
                    navigator.smartstore.upsertSoupEntries(config.APIList[key].soupName, [data], function(response) {
                        if(response !== undefined && response.ResultCode !== 1){
                            config.APIList[key].isDataAvailable = true;
                            config.APIList[key].APICalled = "Called";
                        }
                    }, function(e) {
                        config.APIList[key].APICalled = false;
                        console.log('error ' + e);
                    });
                } catch (e) {
                    console.log('error :' + e);
                }
            }, function(err) {
                config.APIList[key].APICalled = false;
                console.log("registerSoup failed with error:" + err);
            });
        };

        service.updateSoup = function (key, data) {
            try {
                service.querySoup(config.APIList[key].soupName, function (response) {
                        var dataToPush = {
                            CaseList: []
                        };
                        dataToPush.CaseList = response.currentPageOrderedEntries[0].CaseList;
                        console.log(dataToPush);
                        dataToPush.CaseList.push(data);
                        console.log(dataToPush);
                        service.removeSoup(config.APIList[key].soupName);
                        service.registerAndUpsertSoup(key, dataToPush);
                    },
                    function (e) {
                        console.log('Error :' + e);
                    });
            } catch (e) {
                console.log('Error :' + e);
            }
        };

        service.querySoup = function (soupName, successCallback, errorCallback) {

            if (errorCallback == null) {
                errorCallback = function (err) {
                    console.log('Error occurred while invoking: ' + config.APIList[key].api + ' - ' + JSON.stringify(err));
                    service.closeLoader();
                }
            }

            try{
                if ( soupName === 'needHelpRelocateReturnCases' ) {
                    var querySpec = navigator.smartstore.buildAllQuerySpec("SubCaseTypeName", null, 100);
                } else if( soupName === 'userInfo' ) {
                    var querySpec = navigator.smartstore.buildAllQuerySpec("Id", null, 1);
                } else {
                    var querySpec = navigator.smartstore.buildAllQuerySpec("UnitNo", null, 100);
                }

                navigator.smartstore.querySoup(soupName, querySpec, successCallback, errorCallback);
            } catch (e) {
                errorCallback(e);
                console.log('error :' + e);
            }
        };

        service.removeSoup = function (soupName) {
            try{
                navigator.smartstore.removeSoup(soupName, function () {
                    console.log('Soup removed ' + soupName);
                }, function (e) {
                    console.log('Some Error has occured ' + e);
                });
            } catch (e) {
                console.log('Error :' + e);
            }

        };

        service.apply = function () {
            $rootScope.$apply();
        };

        service.closeLoader = function () {
            $ionicLoading.hide();
        };

        service.startLoader = function () {
            $ionicLoading.show();
        };


        return service;
    }

})();