/**
 * Created by om.choudhary on 24-10-15.
 */


(function(){
    'use strict';

    angular
        .module('app.widgets')
        .directive('mbSubHeader', function(){
            var linkFunction = function(scope, element, attributes) {
                scope.title = attributes['title'];
                scope.backurl = attributes['backurl'];
            };

            return {
                restrict: "E",
                replace: true,
                template: '<div class="bar bar-subheader">' +
                                '<div class="row">' +
                                    '<div class="col-20">' +
                                        '<a class="button icon-left ion-chevron-left button-clear button-dark"' +
                                        'href="#/{{backurl}}"></a>' +
                                    '</div>' +
                                    '<div class="col-80">' +
                                        '<h4 class="text-left text-uppercase">{{title}}</h4>' +
                                    '</div>' +
                                '</div>' +
                            '</div>',
                link: linkFunction
            };
        });

})();


