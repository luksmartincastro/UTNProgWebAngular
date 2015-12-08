"use strict";

app.controller('entregaCtrl', ['$scope', 'PresupServ', '$route', function($scope, PresupServ, $route)
{
	var bandera = 0; // variable global para la 1ra carga en la tabla repuesto
	$scope.SelMarca = {id:'',nombreMarca:''};
	$scope.SelModelo = {id:'',nombreModelo:'Marcas-Modelos'};
	$scope.imgMarca = 'Marcas_logo.gif';
	$scope.imgModelo = 'Marcas-Modelos.jpg';
	$scope.btnTablaRepDisabled = "false"; //disabled
	$scope.DescripGama = " - Descripcion de las carateristicas de un equipo de una determinada gana";
	$scope.arrayFallaGen = [];
	$scope.arrayServ = [];
	$scope.arrayRep = []; // vector que contendra las id's de los repuestos que necesita la reparacion

	$scope.arrayTablaRep = [ // vectore que contiene los elementos de la tabla repuestos
								{id:'',nombreRep:'-',boton: ' <button type="button" class="btn btn-primary">Default button</button>'},
								{id:'',nombreRep:'-'},
								{id:'',nombreRep:'-'}
							]; 
	
	//---------------------------------------------------------------------------------------
	//------------------------------------metodos--------------------------------------------
	//---------------------------------------------------------------------------------------
	PresupServ.get(function(data)
		{
	        $scope.marcas = data.marcas;
	        $scope.gamas = data.gamas;
	        $scope.fallas = data.fallas;
	        $scope.servicios = data.servicios;

	    });
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.mostrarModelos = function()
	{	
		$scope.imgMarca = $scope.SelMarca.nombreMarca+'_logo.gif';
		$scope.SelModelo = {id:'',nombreModelo:'Marcas-Modelos'};
		$scope.imgModelo = 'Marcas-Modelos.jpg';
		bandera = 0; // banddera en 0 para indicar que se tiene un modelo nuevo		
		var resource = { idMarca: $scope.SelMarca.id }; 	

		PresupServ.getModelos(resource).$promise.then(function(data)
			{
				if (data.msg)
				{
					$scope.modelos = data.modelos;
				};
			});
	};	
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.mostrarRep = function()
	{
		$scope.imgModelo = $scope.SelMarca.nombreMarca+'-'+$scope.SelModelo.nombreModelo+'.jpg';
		bandera = 0; // banddera en 0 para indicar que se tiene un modelo nuevo
		var resource = { idModelo: $scope.SelModelo.id }; 	
		PresupServ.getRepuestos(resource).$promise.then(function(data)
			{
				if (data.msg)
				{
					$scope.repuestos = data.repuestos;
					$scope.arrayTablaRep = [ // si cargo repuestos nuevos => debo borrar 
								{id:'',nombreRep:'-'},
								{id:'',nombreRep:'-'},
								{id:'',nombreRep:'-'}
							];
				};
			});		 
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.mostrarDescripGama = function()
	{
		$scope.DescripGama = $scope.SelGama.descripcion;		
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.updateSelection = function($event, id) {
	  var checkbox = $event.target;
	  var action = (checkbox.checked ? 'add' : 'remove');	  
	  if (action === 'add' && $scope.arrayFallaGen.indexOf(id) === -1)
	  {
	    $scope.arrayFallaGen.push(id);
	  }
	  if (action === 'remove' && $scope.arrayFallaGen.indexOf(id) !== -1)
	  {
	    $scope.arrayFallaGen.splice($scope.arrayFallaGen.indexOf(id), 1);
	  }
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.updateSelectionServ = function($event, id) {
	  var checkbox = $event.target;
	  var action = (checkbox.checked ? 'add' : 'remove');	  
	  if (action === 'add' && $scope.arrayServ.indexOf(id) === -1)
	  {
	    $scope.arrayServ.push(id);
	  }
	  if (action === 'remove' && $scope.arrayServ.indexOf(id) !== -1)
	  {
	    $scope.arrayServ.splice($scope.arrayServ.indexOf(id), 1);
	    //splite(arg1,arg2); arg1: es la posicion a eliminar y arg2: la cantidad de elementos a eliminar
	  }
	};		
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.agregarTablaRep = function()
	{
		if (bandera == 0) // bandera es una variable q me indica si es el mismo modelo, si no es borra la tabla
		{
			$scope.arrayTablaRep = [];
			bandera = 1;
		};				 
		var filaRep = {
			id: $scope.SelRep.id,
			nombreRep: $scope.SelRep.nombreRep
		};		
		var result = search(filaRep.nombreRep, $scope.arrayTablaRep);
		if (result != 1)
		{
			$scope.arrayRep.push(filaRep.id);
			$scope.arrayTablaRep.push(filaRep);
			$scope.btnTablaRepDisabled = "true";
		};		
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	function search(nameKey, myArray)
	{
		var B = 0;
	    for (var i=0; i < myArray.length; i++) {
	        if (myArray[i].nombreRep === nameKey)
	        {
	        	B = 1;
	        }
	    }
	    return B;
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------




}]);