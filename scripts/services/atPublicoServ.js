"use strict";

app.factory('PresupServ', function($resource)
{
	
	return $resource('http://localhost/ProgWeb2015/public/AtPublicoIndex',{},
		{
			getModelos: 
				{ method:'POST',
				  params: {idMarca: "@idMarca"},
				  url: "http://localhost/ProgWeb2015/public/getModelos"
				},
			//----------------------------------
			getRepuestos: 
				{ method:'POST',
				  params: {idModelo: "@idModelo"}, 
				  url: "http://localhost/ProgWeb2015/public/getRepuestos"
				},
			//----------------------------------
			getPresupuesto: 
				{ method:'POST',
				  params: {idGama: "@idModelo", vectorRep: "@vectorRep", vectorServ:"@vectorServ"},
				  url: "http://localhost/ProgWeb2015/public/getPresupuesto"
				}
		});	 		 
	
}); 
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------



