"use strict";


app.controller('entregaCtrl', ['$scope', 'EntregaServ', '$route', function($scope, EntregaServ, $route)
{
	$scope.ordenes = [];
	$scope.ordenEncontrada = '';
	$scope.ordenBuscar = {ApeNom:"", OrdenNum:""};
	$scope.btnTraerOrden = false;
	$scope.cantEquipo = 0; 
	$scope.importeTotal = 0;
	$scope.cantEquiMostrar = 0;
	$scope.btnImprimir = {enable:false, cls:'btn-default', icono:'glyphicon glyphicon-print', ref:''};
	$scope.pagEntregaActiva = 'active';


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
		var filaNuevas = "<tr><td>1</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>"+
						"<tr><td>2</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>"+
						"<tr><td>3</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>"+
						"<tr><td>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>"+
						"<tr><td>5</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>"+
						"<tr><td>6</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>"+
						"<tr><td>7</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>"+
						"<tr><td>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>"; 
		$("#tablaEq").append(filaNuevas);
						
		var resource = { idOrden: $scope.OrdenNum};
		EntregaServ.getTraerOrden(resource).$promise.then(function(data)
			{
				if (data.msg)
				{
					$scope.ordenEncontrada = data.orden;
					$scope.equipook = data.equiposOK;
					$scope.equipono = data.equiposNO;
					// contar equipos para eliminar filas
					// agregar 2 elementos a cada equipo clase para color e icono segu estado del equipo
					var iok = $scope.equipook.length;
					var ino = $scope.equipono.length;
					$scope.cantEquipo = iok + ino;
					$scope.cantEquiMostrar = $scope.cantEquipo;
					while( $scope.cantEquipo > 0 )
					{
						$("#tablaEq tr:last").remove();//reueve la fila ultima
						$scope.cantEquipo--;
					};

					angular.forEach($scope.equipook, function(equipo)
					{
						//equipo.estadoReparacion;
						equipo['clase'] = 'btn-success';
				        equipo['icono'] = 'glyphicon glyphicon-ok';
				        $scope.btnImprimir.enable = true;
				        $scope.btnImprimir.cls = 'btn-success';
				        $scope.btnImprimir.ref = 'http://localhost:8080/UTNProgWeb2015/public/imprimirFactura?idEquipo='+equipo['id'];						        
				    	$scope.importeTotal = $scope.importeTotal + equipo.presupFinal;
						
					});
					angular.forEach($scope.equipono, function(equipo)
					{
						//equipo.estadoReparacion;
						switch(equipo.estadoReparacion)
						{
						    case 'PENDIENTE':
						        equipo['clase'] = 'btn-warning';
						        equipo['icono'] = 'glyphicon glyphicon-pencil';
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
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	$scope.btnDetalleEqOK = function(indice)
	{
		var filaEq = $scope.equipook[indice];

		$scope.arrayServModal = filaEq.vectorServi;// carga servicios al seleccionar un equipo
		$scope.arrayRepModal = filaEq.vectorRepu;
		$scope.arrayAccModal = filaEq.vectorAcc;
		$scope.arrayFallaGenModal = filaEq.vectorFalla;
		$scope.arrayInfModal = filaEq.vectorInf;

		$scope.detalleEQ = $scope.equipook[indice];
		$scope.imgMarcaModal = $scope.detalleEQ.marca+'_logo.gif';
		$scope.imgModeloModal = $scope.detalleEQ.marca +'-'+$scope.detalleEQ.modelo+'.jpg';
		

	};
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	//---------------------------------------------------------------------
	$scope.btnDetalleEqNO = function(indice)
	{
		var filaEq = $scope.equipono[indice];

		$scope.arrayServModal = filaEq.vectorServi;// carga servicios al seleccionar un equipo
		$scope.arrayRepModal = filaEq.vectorRepu;
		$scope.arrayAccModal = filaEq.vectorAcc;
		$scope.arrayFallaGenModal = filaEq.vectorFalla;
		$scope.arrayInfModal = filaEq.vectorInf;

		$scope.detalleEQ = $scope.equipono[indice];
		$scope.imgMarcaModal = $scope.detalleEQ.marca+'_logo.gif';
		$scope.imgModeloModal = $scope.detalleEQ.marca +'-'+$scope.detalleEQ.modelo+'.jpg';
		

	};
}]);