"use strict";
 
app.controller('presupCtrl', ['$scope', 'PresupServ', '$route', function($scope, PresupServ, $route)
{
	var bandera = 0; // variable global para la 1ra carga en la tabla repuesto
	$scope.filaRepBlanca = 0;
	$scope.filaEqBlanca = 0;

	$scope.SelMarca = {id:'',nombreMarca:''};
	$scope.SelModelo = {id:'',nombreModelo:'Marcas-Modelos'};
	$scope.SelGama = {id:'',nombreGama:'Gama', DescripGama:''};
	$scope.imgMarca = 'Marcas_logo.gif';
	$scope.imgModelo = 'Marcas-Modelos.jpg';	
	$scope.DescripGama = " - Descripcion de las carateristicas de un equipo de una determinada gana";
	$scope.arrayFallaGen = [];
	$scope.arrayServ = [];
	$scope.btnAceptarDisable = false;
	$scope.btnCalcularDisable = false;	
	$scope.btnGuardarDetEnable = false;
	$scope.arrayRep = []; // vector que contendra las id's de los repuestos que necesita la reparacion
	$scope.arrayTablaRep = []; 
	$scope.arrayTablaEq = []; 
	var arrayAcc = [];
	$scope.btnSucces = false; // btn-success 
	$scope.MontoRep = 0;
	$scope.MontoServ = 0;
	$scope.MontoMO = 0;
	$scope.totalPresup = 0; 
	$scope.detalleEQ = null;
	$scope.filaTablaRep = null; 

	$scope.imeiModal = '00000-00000-000008888'; 
	$scope.descripFallaModal = '';
	$scope.imgMarcaModal = 'Marcas_logo.gif';
	$scope.imgModeloModal = 'Marcas-Modelos.jpg'; 
	$scope.arraAccModal = [];
	$scope.arrayServModal = [];  
	$scope.arrayFallaGenModal = [];  

	$scope.btnOkDet = {activar:false,icono:'glyphicon glyphicon-pencil'};	

	//---------------------------------------------------------------------------------------
	//------------------------------------metodos--------------------------------------------
	//--------------------------------------------------------------------------------------- 
	PresupServ.get(function(data)
		{
	        $scope.marcas = data.marcas;
	        $scope.gamas = data.gamas;
	        $scope.fallas = data.fallas;
	        $scope.servicios = data.servicios;
	        $scope.accesorios = data.accesorios;
	        //-------------------------------------
	        var filaEq = {
				clase: 'btn-warning',
				icono: 'glyphicon glyphicon-pencil',
				marca: 'Nokia',
				idModelo: 1,
				modelo: '6131',
				idGama: 3,
				gama: 'Baja',
				imei: '0000-0000-0000',
				presupEst: 300,
				fechaEst: '2015/12/20',
				descripFalla: '',
				vectorFalla: [7,8,9],
				vectorServ: [3,4],
				vectorRep: [],
				vectorAcc: []
			};		

			$scope.arrayTablaEq.push(filaEq);
	    });
	
	//---------------------------------------------------------------------------------------
	//-------------------------------MODAL DETALLE DE EQUIPO---------------------------------
	//---------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------- 
	$scope.agregarTablaAcc = function()
	{
	  	var filaAcc = {
			id: $scope.SelAcc.id,
			nombreAccesorio: $scope.SelAcc.nombreAccesorio
		};	
		var result = search(filaAcc.nombreAccesorio, $scope.arrayAccModal);
		if (result != 1)
		{
			//arrayAcc.push(filaAcc.id);
			$scope.arrayAccModal.push(filaAcc);
			$scope.detalleEQ.vectorAcc.push(filaAcc.id);// = arrayAcc;
			 // Obtenemos el total de columnas (tr) del id "tabla" 
            var trs=$("#tablaAcc tr").length;
            if(trs>1 && $scope.filaRepBlanca <= 3)
            {
                // Eliminamos la ultima columna
                $("#tablaAcc tr:last").remove();
                $scope.filaRepBlanca = $scope.filaRepBlanca +1;
            }			
		};	

	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.elimFilaAcc = function(indice)
	{
		$scope.filaTablaAcc = $scope.arrayAccModal[indice];
		var id = $scope.filaTablaAcc.id;
		id = parseInt(id); // convertimos a entero para que pueda encontrar el elemento en el array
		var posArrayAcc = $scope.detalleEQ.vectorAcc.indexOf(id);
		if ( posArrayAcc !== -1) 
		{
			$scope.arrayRep.splice(posArrayAcc, 1);	
			$scope.arrayAccModal.splice(posArrayAcc, 1);
			if ($scope.filaRepBlanca !=0)
			{
				var nuevaFila = "<tr>"+
		                          "<td>#</td>"+                                        
		                          "<td>-</td>"+                                            
		                          "<td>-</td>"+
		                        "</tr>";
				$("#tablaAcc").append(nuevaFila);
				$scope.filaRepBlanca = $scope.filaRepBlanca -1;
			};						
		};
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.btnDetalleEq = function(indice)
	{

		$scope.arrayServModal = [];
		$scope.arrayFallaGenModal = [];		
		$scope.arrayRepModal = [];		
		$scope.arrayAccModal = [];		
		//--- reset el boton del modal de detalle-----

		//---- reset del combo repuesto y su tabla----
		$scope.SelAcc = {id:'',nombreAccesorio:''};			
		//$('#tablaAcc').find('tbody').empty();
		 $("#tablaAcc").find("tr:gt(0)").remove();
		var nuevaFila = "<tr><td>#</td><td>-</td><td>-</td></tr>"+						
						"<tr><td>#</td><td>-</td><td>-</td></tr>";
		$("#tablaAcc").append(nuevaFila);
		//$("#tablaFallaModalDet").find("tr:gt(0)").remove(); 
		//$("#tablaServModalDet").find("tr:gt(0)").remove();		

		$scope.detalleEQ = $scope.arrayTablaEq[indice];

		$scope.imgMarcaModal = $scope.detalleEQ.marca+'_logo.gif';
		$scope.imgModeloModal = $scope.detalleEQ.marca+'-'+$scope.detalleEQ.modelo+'.jpg';								
		// cargar fallas del equipo --------------------------
		angular.forEach($scope.detalleEQ.vectorFalla, function (vf)
		{
            angular.forEach($scope.fallas, function (item)
			{
				if (item.id == vf)
				{
					$scope.arrayFallaGenModal.push(item.descripcionFallaGen);					
				};				            
	        });
        });
		// cargar servicios del equipo --------------------------		
		angular.forEach($scope.detalleEQ.vectorServ, function (vs)
		{
            angular.forEach($scope.servicios, function (item)
			{
				if (item.id == vs)
				{
					$scope.arrayServModal.push(item.nombreServicio);					
				};				            
	        });
        });
		// cargar repuestos del equipo --------------------------		
		angular.forEach($scope.detalleEQ.vectorRep, function (r)
		{
			$scope.arrayRepModal.push(r.nombreRep);					            
        });
		// cargar accesorios del equipo --------------------------		
		angular.forEach($scope.detalleEQ.vectorAcc, function (va)
		{
            angular.forEach($scope.accesorios, function (item)
			{
				if (item.id == va)
				{					
					$scope.arrayAccModal.push(item);					
				};				            
	        });
        });
		$('#ModalDetalle').modal('show'); 
	};
	//--------------------------------------------------------------------------------------- 
	//--------------------------------------------------------------------------------------- 
	$scope.verificarDatosEq = function()
	{
		var isImei = $scope.detalleEQ.imei != '0000-0000-0000';
		var isDescrip = $scope.detalleEQ.descripFalla != '';

		if (isImei && isDescrip)
		{
			$scope.detalleEQ.icono = 'glyphicon glyphicon-ok';
			$scope.detalleEQ.clase = 'btn-success';
			$scope.btnOkDet.activar = true;
			$scope.btnOkDet.icono = 'glyphicon glyphicon-ok'
		}
		else
		{
			$scope.detalleEQ.icono = 'glyphicon glyphicon-pencil';
			$scope.detalleEQ.clase = 'btn-warning';				
			$scope.btnOkDet.activar = false;
			$scope.btnOkDet.icono = 'glyphicon glyphicon-pencil';
		};		
	};

	//--------------------------------------------------------------------------------------- 
	//-----------------------------MODAL PRESUPUESTO----------------------------------------- 
	//--------------------------------------------------------------------------------------- 
	//--------------------------------------------------------------------------------------- 
	$scope.abrirModalPresup = function()
	{
		$scope.MontoMO = 0;
		$scope.MontoRep = 0;
		$scope.MontoServ = 0;
		$scope.totalPresup = 0;				
		$scope.btnAceptarDisable = false;
		$scope.btnCalcularDisable = false;
		$scope.arrayRep = []; // vector que contendra las id's de los repuestos que necesita la reparacion
		$scope.arrayTablaRep = []; 

		$scope.SelMarca = {id:'',nombreMarca:''};
		$scope.SelModelo = {id:'',nombreModelo:'Marcas-Modelos'};
		$scope.SelGama = {id:'',nombreGama:'Gama', DescripGama:''};
		$scope.DescripGama = " - Descripcion de las carateristicas de un equipo de una determinada gana";
		$scope.imgMarca = 'Marcas_logo.gif';
		$scope.imgModelo = 'Marcas-Modelos.jpg';
		$scope.SelRep = {id:'',nombreRep:''};	

		// ---- reset de los checks de fallas
		var checksFallas = $('.clsCheckFalla');
		angular.forEach(checksFallas, function (item) {
            item.checked = false;
        });
        $scope.arrayFallaGen = [];
        // ---- reset de los checkd e servicios
        var checksServ = $('.clsCheckServ');
        angular.forEach(checksServ, function (item) {
            item.checked = false;
        });
        $scope.arrayServ = [];

		$('#modalPresupuesto').modal('show');							
	};
	//---------------------------------------------------------------------------------------
	// funcion que retorna true si ocurre q marca, modelo, gama, falla y servicio tienen 
	// algun valor seleccionado
	//---------------------------------------------------------------------------------------
	function habilitarBtnPresup()
	{
		var B = false;
		var isMarca = $scope.SelMarca.nombreMarca != "Marca";
		var isModelo = $scope.SelModelo.nombreModelo != "Modelo";
		var isGama = $scope.SelGama.nombreGama != "Gama";
		var isFalla = $scope.arrayFallaGen.length != 0;
		var isSevicio = $scope.arrayServ.length != 0;

		if (isMarca && isModelo && isGama)
		{
			if (isFalla || isSevicio)
			{
				B= true;
			};
		};
		return B;
	};
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
					$scope.arrayTablaRep = [];
					if (habilitarBtnPresup())
					{
						$scope.btnCalcularDisable = true;
						$scope.btnSucces = true;
					}
					else
					{
						$scope.btnCalcularDisable = false;
						$scope.btnSucces = false;	
					};
				};
			});		 
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.mostrarDescripGama = function()
	{
		$scope.DescripGama = $scope.SelGama.descripcion;
		if (habilitarBtnPresup())
		{
			$scope.btnCalcularDisable = true;
			$scope.btnSucces = true;
		}
		else
		{
			$scope.btnCalcularDisable = false;
			$scope.btnSucces = false;	
		};		
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.updateSelection = function($event, id)
	{
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
	  	if (habilitarBtnPresup())
		{
			$scope.btnCalcularDisable = true;
			$scope.btnSucces = true;
		}
		else
		{
			$scope.btnCalcularDisable = false;
			$scope.btnSucces = false;	
		};
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.updateSelectionServ = function($event, id)
	{
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
	  	if (habilitarBtnPresup())
		{
			$scope.btnCalcularDisable = true;
			$scope.btnSucces = true;
		}
		else
		{
			$scope.btnCalcularDisable = false;
			$scope.btnSucces = false;	
		};
	};			
	//---------------------------------------------------------------------------------------
	// funcion que compara elementos del un array y busca repetidos
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
	$scope.agregarTablaRep = function()
	{
		if (bandera == 0) // bandera es una variable q me indica si es el mismo modelo, si no es borra la tabla
		{
			$scope.arrayTablaRep = [];
			bandera = 1;
			$scope.filaRepBlanca = 0;
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
			 // Obtenemos el total de columnas (tr) del id "tabla"
            var trs=$("#tablaRep tr").length;
            if(trs>1 && $scope.filaRepBlanca <= 3)
            {
                // Eliminamos la ultima columna
                $("#tablaRep tr:last").remove();
                $scope.filaRepBlanca = $scope.filaRepBlanca +1;
            }			
		};		
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.elimFilaRep = function(indice)
	{
		$scope.filaTablaRep = $scope.arrayTablaRep[indice];
		var id = $scope.filaTablaRep.id;
		id = parseInt(id); // convertimos a entero para que pueda encontrar el elemento en el array
		var posArrayRep = $scope.arrayRep.indexOf(id);
		if ( posArrayRep !== -1) 
		{
			$scope.arrayRep.splice(posArrayRep, 1);	
			$scope.arrayTablaRep.splice(posArrayRep, 1);
			if ($scope.filaRepBlanca !=0)
			{
				var nuevaFila = "<tr>"+
		                          "<td>#</td>"+                                        
		                          "<td>-</td>"+                                            
		                          "<td>-</td>"+
		                        "</tr>";
				$("#tablaRep").append(nuevaFila);
				$scope.filaRepBlanca = $scope.filaRepBlanca -1;
			};						
		};
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	function fragmentarFecha(fecha)
	{
		var fechaFrac = 
		{
			anio: parseInt(fecha.substr(0,4)),
			mes: parseInt(fecha.substr(5,2))-1,
			dia: parseInt(fecha.substr(8))+2 			
		};

		return fechaFrac;
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.getPresupuesto = function()
	{
		var resource = 
			{ idGama: $scope.SelGama.id,
			  vectorRep: $scope.arrayRep,
			  vectorServ: $scope.arrayServ
		 	}; 	

		PresupServ.getPresupuesto(resource).$promise.then(function(data)
			{
				if (data.msg)
				{
					$scope.MontoMO = data.costoMO;
					$scope.MontoRep = data.totalRep;
					$scope.MontoServ = data.totalServ;
					var fecha = fragmentarFecha(data.fechaPres);					
					fecha = new Date(fecha.anio,fecha.mes,fecha.dia);
					$scope.dt = fecha;					
					$scope.totalPresup = $scope.MontoMO + $scope.MontoRep + $scope.MontoServ;	
					$scope.btnAceptarDisable = true;				
				};
			});		
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.resetPresupuesto = function()
	{
		$scope.MontoMO = 0;
		$scope.MontoRep = 0;
		$scope.MontoServ = 0;
		$scope.totalPresup = 0;			
		$scope.btnAceptarDisable = false;
		$scope.btnCalcularDisable = false;
		$scope.arrayRep = []; // vector que contendra las id's de los repuestos que necesita la reparacion
		$scope.arrayTablaRep = [];

		$scope.SelMarca = {id:'',nombreMarca:''};
		$scope.SelModelo = {id:'',nombreModelo:'Marcas-Modelos'};
		$scope.SelGama = {id:'',nombreGama:'Gama', DescripGama:''};
		$scope.DescripGama = " - Descripcion de las carateristicas de un equipo de una determinada gana";
		$scope.imgMarca = 'Marcas_logo.gif';
		$scope.imgModelo = 'Marcas-Modelos.jpg';
		//---- reset del combo repuesto y su tabla----
		$scope.SelRep = {id:'',nombreRep:''};			
		$('#tablaRep').find('tbody').empty();
		var nuevaFila = "<tr><td>#</td><td>-</td><td>-</td></tr>"+
						"<tr><td>#</td><td>-</td><td>-</td></tr>"+
						"<tr><td>#</td><td>-</td><td>-</td></tr>";
		$("#tablaRep").append(nuevaFila);
		// ---- reset de los checks de fallas
		var checksFallas = $('.clsCheckFalla');
		angular.forEach(checksFallas, function (item) {
            item.checked = false;
        });
        $scope.arrayFallaGen = [];
        // ---- reset de los checkd e servicios
        var checksServ = $('.clsCheckServ');
        angular.forEach(checksServ, function (item) {
            item.checked = false;
        });
        $scope.arrayServ = [];

	};
	//--------------------------------------------------------------------------------------- 
	//--------------------------------------------------------------------------------------- 
	$scope.agregarTablaEq = function()
	{	
		var vectorFalla = $scope.arrayFallaGen;	
		var vectorServ = $scope.arrayServ;	
		var vectorRep = $scope.arrayTablaRep;

		var filaEq = {
			clase: 'btn-warning',
			icono: 'glyphicon glyphicon-pencil',
			marca: $scope.SelMarca.nombreMarca,
			idModelo: $scope.SelModelo.id,
			modelo: $scope.SelModelo.nombreModelo,
			idGama: $scope.SelGama.id,
			gama: $scope.SelGama.nombreGama,
			imei: '0000-0000-0000',
			presupEst: $scope.totalPresup,
			fechaEst: document.getElementById("idDatePresup").value,
			descripFalla: '',
			vectorFalla: vectorFalla,
			vectorServ: vectorServ,
			vectorRep: vectorRep,
			vectorAcc: []
		};		

		$scope.arrayTablaEq.push(filaEq);
		 // Obtenemos el total de columnas (tr) del id "tabla"
        var trs=$("#tablaEq tr").length;
        if(trs>1 && $scope.filaEqBlanca < 8)
        {
            // Eliminamos la ultima columna
            $("#tablaEq tr:last").remove();
            $scope.filaEqBlanca = $scope.filaEqBlanca +1;
        };
        $('#modalPresupuesto').modal('hide');							
	};
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	

	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
	//----------------------------------Datepicker-------------------------------------------
	//---------------------------------------------------------------------------------------
	$scope.maxDate = new Date(2020, 5, 22);
	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };
	  
	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];

	  $scope.status = {
	    opened: false
	  };

	  var tomorrow = new Date();
	  var afterTomorrow = new Date();

	  //--------------------------------------------------------------------------------
	  //--------------------------------Metodos-----------------------------------------
	  //--------------------------------------------------------------------------------
	  $scope.today = function() {
	    $scope.dt = new Date();
	  };  
	  //--------------------------------------------------------------------------------
	  //--------------------------------------------------------------------------------
	  /*$scope.clear = function () {
	    $scope.dt = null;
	  };*/
	  //--------------------------------------------------------------------------------
	  //--------------------------------------------------------------------------------
	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };
	  //--------------------------------------------------------------------------------
	  //--------------------------------------------------------------------------------
	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	  };  
	  //--------------------------------------------------------------------------------
	  //--------------------------------------------------------------------------------
	  /*$scope.open = function($event) {
	    $scope.status.opened = true;
	  };*/
	  //--------------------------------------------------------------------------------
	  //--------------------------------------------------------------------------------
	  $scope.setDate = function(year, month, day) {
	    $scope.dt = new Date(year, month, day);
	  };
	  //--------------------------------------------------------------------------------
	  //--------------------------------------------------------------------------------  
	  /*$scope.getDayClass = function(date, mode)
	  {
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	      for (var i=0;i<$scope.events.length;i++){
	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	        if (dayToCheck === currentDay) {
	          return $scope.events[i].status;
	        }
	      }
	    }
	    return '';
	  };*/
	//--------------------------------------------------------------------------------
	//--------------------------ejecucion de la configuracion------------------------- 
	//--------------------------------------------------------------------------------
	  $scope.today();
	  $scope.toggleMin();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  afterTomorrow.setDate(tomorrow.getDate() + 2);
	//---------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------
}]); 