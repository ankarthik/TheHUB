(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('mixPanelConfig',{
            MixPanelEnvironment: 'UAT',
            AllowMixPanelIntegration: true,
            MixPanelList: {
                MyEquipment: {
                    id: 1,
                    MixPanelEventLabel: "My Equipment",
                    EventType: "App",
                    Enable: true
                },
                ForgotSomething: {
                    id: 2,
                    MixPanelEventLabel: "Forgot Something",
                    EventType: "App",
                    Enable: true
                },
                MyDelivery: {
                    id: 3,
                    MixPanelEventLabel: "My Delivery",
                    EventType: "App",
                    Enable: true
                },
                NeedHelp: {
                    id: 4,
                    MixPanelEventLabel: "Need Help",
                    EventType: "App",
                    Enable: true
                },
                RelocateReturn: {
                    id: 5,
                    MixPanelEventLabel: "Relocate/Return",
                    EventType: "App",
                    Enable: true
                },
                FutureNeeds: {
                    id: 6,
                    MixPanelEventLabel: "Future Needs",
                    EventType: "App",
                    Enable: true
                },
                RateUs: {
                    id: 7,
                    MixPanelEventLabel: "Rate Us",
                    EventType: "App",
                    Enable: true
                },
                Login: {
                    id: 8,
                    MixPanelEventLabel: "Login",
                    EventType: "App",
                    Enable: true
                },
                Logout: {
                    id: 9,
                    MixPanelEventLabel: "Logout",
                    EventType: "App",
                    Enable: true
                },
                Notifications: {
                    id: 10,
                    MixPanelEventLabel: "Notifications",
                    EventType: "App",
                    Enable: true
                },
                FAQ: {
                    id: 11,
                    MixPanelEventLabel: "FAQ",
                    EventType: "App",
                    Enable: true
                },
                Profile: {
                    id: 12,
                    MixPanelEventLabel: "Profile",
                    EventType: "App",
                    Enable: true
                },
                DialFromBar: {
                    id: 13,
                    MixPanelEventLabel: "Dial (from Bar)",
                    EventType: "App",
                    Enable: true
                },
                DialFromDetails: {
                    id: 14,
                    MixPanelEventLabel: "Dial (from Details)",
                    EventType: "App"
                },
                HUBHelp: {
                    id: 15,
                    MixPanelEventLabel: "HUB Help",
                    EventType: "App"
                },
                ModspaceWebsite: {
                    id: 16,
                    MixPanelEventLabel: "Modspace website",
                    EventType: "App"
                },
                EquipmentDetails: {
                    id: 17,
                    MixPanelEventLabel: "Equipment Details",
                    EventType: "App",
                    Enable: true
                },
                ForgotSomethingRequest: {
                    id: 18,
                    MixPanelEventLabel: "Forgot Something Request",
                    EventType: "App",
                    Enable: true
                },
                ForgotSomethingDetails: {
                    id: 19,
                    MixPanelEventLabel: "Forgot Something Details",
                    EventType: "App",
                    Enable: true
                },
                DeliveryDetails: {
                    id: 20,
                    MixPanelEventLabel: "Delivery Details",
                    EventType: "App",
                    Enable: true
                },
                ReviewInspectionChecklist: {
                    id: 21,
                    MixPanelEventLabel: "Review Inspection Checklist",
                    EventType: "App",
                    Enable: true
                },
                SubmitInspectionChecklist: {
                    id: 22,
                    MixPanelEventLabel: "Submit Inspection Checklist",
                    EventType: "App",
                    Enable: true
                },
                NeedHelpDetails: {
                    id: 23,
                    MixPanelEventLabel: "Need Help Details",
                    EventType: "App",
                    Enable: true
                },
                NewServiceRequest: {
                    id: 24,
                    MixPanelEventLabel: "New Service Request",
                    EventType: "App",
                    Enable: true
                },
                CreateServiceRequest: {
                    id: 25,
                    MixPanelEventLabel: "Create Service Request",
                    EventType: "App",
                    Enable: true
                },
                RelocateReturnDetails: {
                    id: 26,
                    MixPanelEventLabel: "Relocate \ Return Details",
                    EventType: "App",
                    Enable: true
                },
                NewRelocateReturnRequest: {
                    id: 27,
                    MixPanelEventLabel: "New Relocate \ Return Request",
                    EventType: "App",
                    Enable: true
                },
                CreateRelocateReturnRequest: {
                    id: 28,
                    MixPanelEventLabel: "Create Relocate \ Return Request",
                    EventType: "App",
                    Enable: true
                },
                TakeSurvey: {
                    id: 29,
                    MixPanelEventLabel: "Take Survey",
                    EventType: "App",
                    Enable: true
                },
                APICallFail: {
                    id: 30,
                    MixPanelEventLabel: "API Call Fail",
                    EventType: "App",
                    Enable: true
                }
            }
        });
}) ();