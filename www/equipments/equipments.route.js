
(function(){
    'use strict';
 
 angular
 .module('app.equipments')
 .config(function($stateProvider) {
         $stateProvider
             .state('equipments', {
                 url: '/equipments',
                 templateUrl: 'equipments/equipments.html',
                 controller: 'EquipmentsCtrl'
             });
     });

})();