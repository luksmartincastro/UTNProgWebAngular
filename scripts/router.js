"use strict";

var app = angular.module('AdminSEL',["ngResource","ngRoute","ui.bootstrap"]);

app.config(['$routeProvider', function($routeProvider)
	{
		$routeProvider
		.when('/presup',
		{
			templateUrl: 'views/AtPublico/index.html',
			controller: 'presupCtrl'
		})
		.when('/recepcion',
		{
			templateUrl: 'views/AtPublico/recepcion.html',
			controller: 'recepcionCtrl'
		})
		.when('/entrega',
		{
			templateUrl: 'views/AtPublico/entrega.html',
			controller: 'entregaCtrl'
		})
		.otherwise({redirecTo: '/'});  
	}]);   