"use strict";


app.controller('entregaCtrl', ['$scope', 'EntregaServ', '$route', function($scope, EntregaServ, $route)
{
	$scope.ordenes = [];
	$scope.ordenEncontrada = '';
	$scope.ordenBuscar = {ApeNom:"", OrdenNum:""};
	$scope.btnTraerOrden = false;
	$scope.cantEquipo = 0; 

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
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	$scope.getTraerOrden = function()
	{
		var resource = { idOrden: $scope.OrdenNum};
		EntregaServ.getTraerOrden(resource).$promise.then(function(data)
			{
				if (data.msg)
				{
					$scope.ordenEncontrada = data.orden;
					$scope.equipos = data.equipos;

					angular.forEach($scope.equipos, function(equipo)
					{
						//equipo.estadoReparacion;
						switch(equipo.estadoReparacion)
						{
						    case 'PENDIENTE':
						        var color = {clase: 'btn-warning'};
						        $scope.equipo.push(color);
								var icono = {icono: 'glyphicon glyphicon-pencil'};
								$scope.equipo.push(icono);
						        break;
						    case 'LISTO':
						        var color = {clase: 'btn-succes'};
						        $scope.equipo.push(color);
								var icono = {icono: 'glyphicon glyphicon-ok'};
								$scope.equipo.push(icono);
						        break;
						        case 'IRREPARABLE':
						        var color = {clase: 'btn-danger'};
						        $scope.equipo.push(color);
								var icono = {icono: 'glyphicon glyphicon-remove'};
								$scope.equipo.push(icono);
						        break;
						    default:
						        var color = {clase: 'btn-primary'};
						        $scope.equipo.push(color);
								var icono = {icono: 'glyphicon glyphicon-th'};
								$scope.equipo.push(icono);

						}
					})
					// contar equipos para eliminar filas
					// agregar 2 elementos a cada equipo clase para color e icono segu estado del equipo
					var i = $scope.equipos.length;
					$scope.cantEquipo = i;
					while( i>0 )
					{
						$("#tablaEq tr:last").remove();
						i--;
					}
				};
			});
	};
}]);