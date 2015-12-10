"use strict";

app.controller('entregaCtrl', ['$scope', 'EntregaServ', '$route', function($scope, EntregaServ, $route)
{
	$scope.ordenes = [];

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

}]);