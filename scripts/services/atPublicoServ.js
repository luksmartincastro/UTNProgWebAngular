"use strict";

app.factory('PresupServ', function($resource)
{
	
	return $resource('http://localhost/UTNProgWeb2015/public/AtPublicoIndex',{},
		{
			getModelos: 
				{ method:'POST',
				  params: {idMarca: "@idMarca"},
				  url: "http://localhost/UTNProgWeb2015/public/getModelos"
				},
			//----------------------------------
			getRepuestos: 
				{ method:'POST',
				  params: {idModelo: "@idModelo"}, 
				  url: "http://localhost/UTNProgWeb2015/public/getRepuestos"
				},
			//----------------------------------
			getPresupuesto: 
				{ method:'POST',
				  params: {idGama: "@idModelo", vectorRep: "@vectorRep", vectorServ:"@vectorServ"},
				  url: "http://localhost/UTNProgWeb2015/public/getPresupuesto"
				},
			//----------------------------------  
			GuardarPresupuesto: 
				{ method:'POST',
				  params: {datosOrden: "@datosOrden", arrayEq: "@arrayEq"},
				  url: "http://localhost/UTNProgWeb2015/public/GuardarPresupuesto"
				}
			//----------------------------------   			 
		});	 		 
	
});  
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

app.factory('EntregaServ', function($resource)
{ 
	return $resource('http://localhost:8080/UTNProgWeb2015/public/Entrega',{},
		{
			getOrdenApeNom: 
				{ method:'POST',
				  params: {term: "@term"},
				  url: "http://localhost:8080/UTNProgWeb2015/public/getOrdenApeNom"
				},
			//----------------------------------
			getOrdenNum: 
				{ method:'POST',
				  params: {term: "@term"},
				  url: "http://localhost:8080/UTNProgWeb2015/public/getOrdenNumero"
				},
			//----------------------------------
			getTraerOrden:
			{
				method:'GET',
				params: {idOrden: "@idOrden"},
				url: "http://localhost:8080/UTNProgWeb2015/public/getTraerOrden"
			}


		});

});




