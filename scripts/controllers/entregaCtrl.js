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
		//Borrar toda la tabla y volver a crearla...
		$("#tablaEq").find("tr:gt(0)").remove();
		var filaNuevas = "<tr><td>1</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr> "+
						"<tr><td>2</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr> "+
						"<tr><td>3</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr> "+
						"<tr><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr> "+
						"<tr><td>5</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr> "+
						"<tr><td>6</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr> "+
						"<tr><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr> "+
						"<tr><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr> ";
		$("#tablaEq").append(filaNuevas);
						
		var resource = { idOrden: $scope.OrdenNum};
		EntregaServ.getTraerOrden(resource).$promise.then(function(data)
			{
				if (data.msg)
				{
					$scope.ordenEncontrada = data.orden;
					$scope.equipos = data.equipos;
					// contar equipos para eliminar filas
					// agregar 2 elementos a cada equipo clase para color e icono segu estado del equipo
					var i = $scope.equipos.length;
					$scope.cantEquipo = i;
					while( i>0 )
					{
						$("#tablaEq tr:last").remove();//reueve la fila ultima
						i--;
					};
					angular.forEach($scope.equipos, function(equipo)
					{
						//equipo.estadoReparacion;
						switch(equipo.estadoReparacion)
						{
						    case 'PENDIENTE':
						        equipo['clase'] = 'btn-warning';
						        equipo['icono'] = 'glyphicon glyphicon-pencil';
						        break;
						    case 'LISTO':
						    	equipo['clase'] = 'btn-success';
						        equipo['icono'] = 'glyphicon glyphicon-ok';
						        break;
						    case 'IRREPARABLE':
						    	equipo['clase'] = 'btn-danger';
						        equipo['icono'] = 'glyphicon glyphicon-remove';
						        break;
						    default:
						    	equipo['clase'] = 'btn-primary';
						        equipo['icono'] = 'glyphicon glyphicon-th';

						}
					});

					
				};
			});
	};
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	$scope.limpiarCampos = function()
	{
		$scope.ApeNom = "";
		$scope.OrdenNum = "";
	};
}]);