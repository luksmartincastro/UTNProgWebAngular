"use strict";


app.controller('entregaCtrl', ['$scope', 'EntregaServ', '$route', function($scope, EntregaServ, $route)
{
	$scope.ordenes = [];
	$scope.ordenBuscar = {ApeNom:"", OrdenNum:""};
	$scope.btnTraerOrden = false;

	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	$scope.getOrdenApeNom = function()
	{
	    var resource = { term: $scope.ApeNom }; 	
		EntregaServ.getOrdenApeNom(resource).$promise.then(function(data)
			{
				if (data.msg)
				{
					$scope.ordenes = data.ordenes;
				};
			});	
	};
	 //---------------------------------------------------------------------
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	$scope.actualizarApeNom = function(apeNom, ordenNum)
	{
		$scope.ordenBuscar = {
			ApeNom: apeNom,
			OrdenNum: ordenNum
		};
		$scope.ApeNom = apeNom;
		$scope.OrdenNum = ordenNum;
		$scope.ordenes = [];
		$scope.btnTraerOrden = true;
	};

	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	$scope.getOrdenNum = function()
	{
	    var resource = { term: $scope.OrdenNum }; 	
		EntregaServ.getOrdenNum(resource).$promise.then(function(data)
			{
				if (data.msg)
				{
					$scope.ordenes = data.ordenes;
				};
			});	
	};
}]);