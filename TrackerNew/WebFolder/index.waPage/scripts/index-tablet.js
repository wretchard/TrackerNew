
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		varURL='http://openstates.org/api/v1/bills/AR/2013/SB%2054/?apikey=a7b283f866e94ff0a572ec269c76a32e'

		try {
		$.getJSON( varURL, function() {alert('hi')})	
		} catch (e) {
			debugger;
		}

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
