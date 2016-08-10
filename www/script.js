(function() {
	'use strict';

	angular
		.module('app', [
			'ui.router',
			'ngCordova',
			'ionic',
			'ngIOS9UIWebViewPatch',
            'angular.filter',
            'app.core',
			'app.home',
			'app.equipments',
			'app.forgotSomething',
			'app.myDelivery',
			'app.needHelp',
			'app.widgets',
			'app.outboundInspection',
			'app.relocateReturn',
            'app.rateUs',
			'app.userProfile',
			'app.notifications',
			'ngTouch'
		]);
})();
