(function(){
    'use strict';

    angular.
        module('app.widgets', []).directive('mixular', ['mixPanelConfig',

            function(mixPanelConfig) {
                // Runs during compile
                return {

                    link: function($scope, elm, attrs) {
                        elm.on(attrs.mixular, function(evnt) {
                            var properties = {};
                            var sd = new Date();
                            var start_time  = JSON.stringify(sd.getTime());

                            //Add all the attributes that begin with
                            //prop in the properties object.
                            for (var key in attrs.$attr) {
                                if (key.indexOf("prop") > -1) {
                                    properties[key] = attrs[key];
                                }
                            }
                            properties["time"] = start_time;
                            properties["ENV"] = mixPanelConfig.MixPanelEnvironment;

                            //Send the tracking info to mix-panel
                            mixpanel.track(attrs.eventlabel, properties);
                        });
                    }
                };
            }
        ]);
})();
