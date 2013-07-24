
WAF.onAfterInit = function onAfterInit() {// @lock



// @region namespaceDeclaration// @startlock
	var menuItemFind = {};	// @menuItem
	var menuItemState = {};	// @menuItem
	var componentWebMain = {};	// @component
// @endregion// @endlock
getState =function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}

// eventHandlers// @lock

	menuItemFind.click = function menuItemFind_click (event)// @startlock
	{// @endlock
		try {
			$$('componentWebMain').loadComponent('/Components/Find.waComponent');
			
	
	} catch (e) {

	}

	};// @lock

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
		stateName=getState('trackerState')
		if (stateName !==null) {
			stateName=stateName.toUpperCase();
		}
		$$('richTextStateName').setValue(stateName)			
		if ($$('componentWebMain').config['data-path']=="/Components/Splash.waComponent") {
		$$('componentWebMain').removeComponent();
		$$('menuBarWebMain').show()		
		}
	} catch (e) {
		console.log(e.message);
	}

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("menuItemFind", "click", menuItemFind.click, "WAF");
	WAF.addListener("menuItemState", "click", menuItemState.click, "WAF");
	WAF.addListener("componentWebMain", "click", componentWebMain.click, "WAF");
// @endregion
};// @endlock
