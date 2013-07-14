
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var menuItemState = {};	// @menuItem
	var componentWebMain = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	menuItemState.click = function menuItemState_click (event)// @startlock
	{// @endlock
		try {
			$$('componentWebMain').loadComponent('/Components/State.waComponent');
	
	} catch (e) {

	}

	};// @lock

	componentWebMain.click = function componentWebMain_click (event)// @startlock
	{// @endlock
		try {
		if ($$('componentWebMain').config['data-path']=="/Components/Splash.waComponent") {
		$$('componentWebMain').removeComponent();
		$$('menuBarWebMain').show()
		}
	} catch (e) {
		console.log(e.message);
	}

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("menuItemState", "click", menuItemState.click, "WAF");
	WAF.addListener("componentWebMain", "click", componentWebMain.click, "WAF");
// @endregion
};// @endlock
