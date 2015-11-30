"use strict";

app.directive('btnElimRep', function()
	{
		var configBtn = {
			link: function(scope, iElement, attrs)
			{
				iElement.disabled = '';
			};
		};
		return configBtn;
	});