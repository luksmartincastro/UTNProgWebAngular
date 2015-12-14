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
		var configBtn = {
			link: function(scope, iElement, attrs)
			{
				scope.btnDetalleEq = function()
				{
					scope.imeiModal = iElement.find('clsImeiModal').text();
					scope.descripFallaModal = iElement.find('clsDescripFallaModal').text(); 
					
					scope.imgMarcaModal = iElement.find('imgMar').text();
					scope.imgModeloModal = iElement.find('imgMod').text();
					$scope.arraAccModal = iElement.arraAcc;
					$scope.arrayServModal = iElement.arrayServ;
					$scope.arrayFallaGenModal = iElement.arrayFallaGen;
					$('#ModalDetalle').modal('show');
				};
				//----------------------------------------------------- 
				scope.btnElimEq = function()
				{

				};
			}
		};
		return configBtn;
	});