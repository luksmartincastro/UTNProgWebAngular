"use strict";

app.directive('directbtntablarep', function()
	{
		var configBtn = {
			
			link: function(scope, iElement, attrs)
			{
				iElement.disabled = '';
				scope.elimFilaRep = function()
				{
					var id = iElement.find('td.valorId').text();
					if (scope.arrayRep.indexOf(id) !== -1)
					{
						scope.arrayRep.splice(scope.arrayRep.indexOf(id), 1);	
					};
				};
			}
		};
		return configBtn;
	});
//--------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------