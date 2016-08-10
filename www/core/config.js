(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('config', {
            //BaseApiUrls:
            //for Dev ENV: https://devsandbox-moddev.cs24.force.com/magicboard
            //for Mockable Env: http://modspace.vixtasolutions.mockable.io/v1
            //for UAT Env: https://uatsandbox-thehub.cs27.force.com
            //for Production: https://thehub.modspace.com
            baseApiUrl: 'https://uatsandbox-thehub.cs27.force.com',
            message: {
                unexpectedError: 'Something went wrong. Please try again shortly.',
                networkNotAvailable: 'You’re not connected to the Internet. Please connect to the Internet and try again.',
                requiredSelection: 'Please make a selection.',
                forgotSomethingSuccess: 'Thank you for your selection. A ModSpace representative will call you shortly.',
                createServiceSuccess: 'Thank you for using The Hub to submit your request. We will contact you shortly. Your case ID is ',
                createServiceSubTypeErr: 'Please select a Sub Type.',
                createServiceDateErr: 'Please select a Requested Date.',
                needHelpActivatedContractMsg: 'Sorry, your building was just delivered so we’re still in the process of activating it in our system. If you need immediate help, please click on the menu icon at the top of The Hub to contact Customer Service. Our system is usually updated within 24 hours.',
                relocateReturnActivatedContractMsg: 'You will be able to submit a Relocate/Return request for this unit after it is activated in the ModSpace system. If you need immediate help, please click on your menu icon at the top of The Hub app to contact Customer Service.',
                logoutMessage: 'Are you sure you want to logout?',
                dialNumberMsg: 'Press OK to call to a Modspace representative',
                rateUsSurveyCompletedMsg: 'It seams that you have already submitted this survey. Thanks for your valuable feedback.',
                responseCode: {
                    401: 'Session expired or invalid',
                    404: 'Sorry! The Hub is unable to connect to the server. Please try again shortly.',
                    403: 'Sorry! The Hub is unable to connect to the server. Please try again shortly.',
                    500: 'Internal server error, Please try again later.',
                    400: ''
                }
            },
            allowNotificationCountToTakeFromConfig: false,
            notificationCount: 0,
            allowCache: true,
            APIList: {
                MyEquipments: {
                    title: 'My Equipments',
                    api: '/GetEquipmentList',
                    soupName: 'myEquipmentList',
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                ForgotSomethingGetItemsList: {
                    title: 'Forgot Something - Get items',
                    api: '/GetFSList',
                    soupName: 'forgotSomethingItemsList',
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                ForgotSomethingAndMyDelivery: {
                    title: 'Forgot Something AndMy Delivery',
                    api: '/GetDeliveryDetails',
                    soupName: 'forgotSomethingAndMyDeliveryList',
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                GetOutboundInspectionDetails: {
                    title: 'Outbound Inspection Details',
                    api: '/GetInspectionDetails?inspectionId=',
                    soupName: null,
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend:
                    {
                        inspectionId: null
                    },
                    APICalled: false
                },
                NeedHelp: {
                    title: 'Need Help',
                    api: '/GetSRCases',
                    soupName: 'needHelpList',
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                GetNeedHelpRelocateReturnCases: {
                    title: 'Need Help / Relocate-Return - Get Cases',
                    api: '/GetCaseTypes',
                    soupName: 'needHelpRelocateReturnCases',
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                RelocateReturn: {
                    title: 'Relocate Return',
                    api: '/GetRRCases',
                    soupName: 'relocateReturnList',
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                GlobalSetting: {
                    title: 'Global Settings',
                    api: '/GetGlobalSetting',
                    soupName: null,
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                UserInfo: {
                    title: 'User Information',
                    api: '/GetCurrentUserProfile',
                    soupName: 'userInfo',
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                RateUsInfo: {
                    title: 'Rate Us Instance',
                    api: '/GetCurrentUserRateUsInstance',
                    soupName: 'rateUsInfo',
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend: null,
                    APICalled: false
                },
                DeviceInfoUpdate: {
                    title: 'Rate Us Instance',
                    api: '/DeviceContactMap',
                    soupName: null,
                    timestamp: '',
                    isDataAvailable: false,
                    parameterToSend:
                    {
                        deviceId: null,
                        userId: null
                    },
                    APICalled: false
                }
            }
        });
})();