(function() {
    'use strict';

    angular
        .module('app.error')
        .controller('ErrorCtrl', Error);

    function Error($scope) {
        $scope.message = 'Oops! Something has gone wrong.';

        $scope.pageClass = 'error';
    }
})();