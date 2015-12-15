"use strict";

app.directive('directbtntablarep', function()
	{
		var configBtn = {
			
			link: function(scope, iElement, attrs)
			{
				//iElement.disabled = '';
				scope.elimFilaRep = function()
				{
					var id = iElement.find('td.valorId').text();
					id = parseInt(id); // convertimos a entero para que pueda encontrar el elemento en el array
					var posArrayRep = scope.arrayRep.indexOf(id);
					if ( posArrayRep !== -1) 
					{
						scope.arrayRep.splice(posArrayRep, 1);	
						scope.arrayTablaRep.splice(posArrayRep, 1);
						if (scope.filaRepBlanca !=0)
						{
							var nuevaFila = "<tr>"+
					                          "<td>#</td>"+                                        
					                          "<td>-</td>"+                                            
					                          "<td>-</td>"+
					                        "</tr>";
            				$("#tablaRep").append(nuevaFila);
            				scope.filaRepBlanca = scope.filaRepBlanca -1;
						};						
					};
				};
			}
		};
		return configBtn;
	});
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------
app.directive('directbtntablaeq', function()
	{
		var configBtnDetalle = {

			link: function(scope, iElement, attrs)
			{
				scope.btnDetalleEq = function()
				{
					scope.imeiModal = iElement.find('td.clsTEImei').text();
					scope.descripFallaModal = iElement.find('td.clsTEDescripFalla').text(); 					
					scope.imgMarcaModal = iElement.find('td.clsTEMarca').text()+'_logo.gif';
					scope.imgModeloModal = iElement.find('td.clsTEMarca').text()+'-'+iElement.find('td.clsTEModelo').text()+'.jpg';						
					// cargar fallas del equipo --------------------------
					var cantFalla = iElement.find('td.clsIdFalla').length; 
					var i = 0;
					while( i < cantFalla )
					{						
						var idFalla = iElement.find('td.clsIdFalla').eq(i).text();						
						angular.forEach(scope.fallas, function (item)
						{
							if (item.id == idFalla)
							{
								scope.arrayFallaGenModal.push(item.descripcionFallaGen);
								var b1 = 0;
								if (b1 < 4)
								{
									$("#tablaFallaModalDet tr:last").remove();
									b1++;
								};
							};				            
				        });					        					
				        i++; 
					};
					// cargar servicios del equipo -------------------------- 
					var cantServ = iElement.find('td.clsIdServ').length; 
					var i = 0;
					while( i < cantServ )
					{						
						var idServ = iElement.find('td.clsIdServ').eq(i).text();						
						angular.forEach(scope.servicios, function (item)
						{
							if (item.id == idServ)
							{
								scope.arrayServModal.push(item.nombreServicio);
								var b1 = 0;
								if (b1 < 4)
								{
									$("#tablaServModalDet tr:last").remove();
									b1++;
								};
							};				            
				        });					        					
				        i++; 
					};
					// cargar accesorios del equipo --------------------------
					var cantAcc = iElement.find('td.clsIdAcc').length; 
					//var elementosAcc = iElement.find('td.clsIdAcc'); 
					var elementCheck = $('.checkAccesorio');
					var i = 0;
					while( i < cantAcc )
					{						
						var idAcc = iElement.find('td.clsIdAcc').eq(i).text();						
						angular.forEach(scope.servicios, function (item)
						{
							if (item.id == idServ)
							{
								scope.arrayServModal.push(item.nombreServicio);
								var b1 = 0;
								if (b1 < 4)
								{
									$("#tablaServModalDet tr:last").remove();
									b1++;
								};
							};				            
				        });					        					
				        i++; 
					};


					//---Recuperamos dato de accesorios------
				    var elementTD = $(objFilaTablaEq).find('td.clsIdAcc');
		    		var elementCheck = $('.checkAccesorio');
		    		var sizeTD = elementTD.size();
		    		var sizeCheck = elementCheck.size();
		    		for (var i=0; i<sizeTD; i++) {

		    			for (var j=0; j<sizeCheck; j++) {
		    			
						    if ($(elementTD[i]).text() == $(elementCheck[j]).val())// pregunto x los ids y habilito los checks 
		    				{
		    					$(elementCheck[j]).prop("checked","true");
		    				};
						}
					}*/

					//scope.arrayFallaGenModal = iElement.arrayFallaGen;
					//$scope.arraAccModal = iElement.arraAcc;
					//$scope.arrayServModal = iElement.arrayServ;

					$('#ModalDetalle').modal('show');
				};
				//----------------------------------------------------- 
				/*scope.btnElimEq = function()
				{

				};*/
			}
		};
		return configBtnDetalle;
	});