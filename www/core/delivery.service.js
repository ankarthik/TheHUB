(function () {

    angular.module('app.core')
        .factory('delivery', function ($filter) {
            var deliveriesDetails = [];

            return {
                saveDeliveries: function (deliveries) {
                    deliveriesDetails = deliveries;
                    console.log(deliveries);
                },
                getDeliveries: function () {
                    return deliveriesDetails;
                },
                getDeliveryByUnit: function (unit){
                    return $filter('filter')(deliveriesDetails, {UnitNo: unit});
                },
                getDeliveryByInspectionId: function (inspectionId){
                    return $filter('filter')(deliveriesDetails, {InspectionId: inspectionId})[0];
                }

            };
        });
})();