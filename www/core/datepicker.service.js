(function () {

    angular.module('app.core')
        .factory('datepicker', datepicker);

    function datepicker(utility,
                        $cordovaDatePicker) {

        var service  = {};

        service.getDate = function (callback) {
            var options = {
                date: new Date(),
                mode: 'date', // 'date' or 'time'
                minDate: new Date(),
                allowOldDates: false,
                allowFutureDates: true,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#000000',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            };

            document.addEventListener("deviceready", function () {

                $cordovaDatePicker.show(options).then(function(date) {
                    if (!utility.isValidDate(date)) {
                        return false;
                    }
                    callback(utility.getFormatedDate(date));
                });

            }, false);
        }

        return service;
    }

})();