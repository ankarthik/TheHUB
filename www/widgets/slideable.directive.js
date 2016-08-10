(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('slideable', function () {
            return {
                restrict: 'C',
                compile: function (element, attr) {
                    // wrap tag
                    var contents = element.html();
                    element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

                    return function postLink(scope, element, attrs) {
                        // default properties
                        attrs.duration = (!attrs.duration) ? '0.7s' : attrs.duration;
                        attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                        element.css({
                            'overflow': 'hidden',
                            'height': '0px',
                            'transitionProperty': 'height',
                            'transitionDuration': attrs.duration,
                            'transitionTimingFunction': attrs.easing
                        });
                    };
                }
            };
        })
        .directive('slideToggle', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    attrs.expanded = false;
                    element.bind('click', function () {
                        var target = document.querySelector(attrs.slideToggle);
                        var content = target.querySelector('.slideable_content');
                        //debugger;
                        if (!attrs.expanded) {
                            content.style.border = '1px solid rgba(0,0,0,0)';
                            var y = content.clientHeight;
                            content.style.border = 0;
                            target.style.height = y + 'px';
                        } else {
                            target.style.height = '0px';
                        }
                        attrs.expanded = !attrs.expanded;
                        var newVal = element.attr('isopen') == 'false' ? 'true' : 'false';
                        element.attr('isopen', newVal);

                        if (element.find('i').hasClass('ion-chevron-up')) {
                            element.find('i').removeClass('ion-chevron-up').addClass('ion-chevron-down');
                        } else {
                            element.find('i').removeClass('ion-chevron-down').addClass('ion-chevron-up');
                        }


                        //collapse other (custom code)
                        var allElements = angular.element('div[id^="pnl"]').not(attrs.slideToggle);
                        allElements.css({
                            'overflow': 'hidden',
                            'height': '0px',
                            'transitionProperty': 'height',
                        });
                        angular.element('div[slide-toggle]').not(this)
                            .find('i')
                            .removeClass('ion-chevron-up')
                            .addClass('ion-chevron-down');
                    });
                }
            }
        });
})();