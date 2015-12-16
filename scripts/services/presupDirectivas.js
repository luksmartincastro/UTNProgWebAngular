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
				
				scope.btnDetalleEq2 = function(indice)
				{
					//scope.arrayFallaGenModal = []; // vaciamos las fallas
					//scope.arrayServModal = [];     // // vaciamos los servicios     
					// vaciamos los accesorios
					/*var checksAcc = $('.clsCheckFalla'); 
					angular.forEach(checksAcc, function (item) {
			            item.checked = false;
			        });*/
					//------------------------
					scope.detalleEQ = scope.arrayTablaEq[indice];
					console.log(scope.arrayTablaEq[indice]);
					//scope.imeiModal = iElement.find('td.clsTEImei').text();
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
						// buscar el check que tiene en la clase idAcc y activarlo
						var check = elementCheck.find(idAcc);
						check.checked = true; 

						/*angular.forEach(elementCheck, function (item)
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
				        });*/	

				        i++; 
					};

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