
WAF.onAfterInit = function onAfterInit() {// @lock



// @region namespaceDeclaration// @startlock
	var menuCandidates = {};	// @menuItem
	var menuBillDetail = {};	// @menuItem
	var menuItemHistory = {};	// @menuItem
	var menuItemAbout = {};	// @menuItem
	var documentEvent = {};	// @document
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

	menuCandidates.click = function menuCandidates_click (event)// @startlock
	{// @endlock
		try {
			$$('componentWebMain').loadComponent('/Components/Candidate.waComponent');
			
	
	} catch (e) {

	}	
	};// @lock

	menuBillDetail.click = function menuBillDetail_click (event)// @startlock
	{// @endlock
		//$$('componentWebMain').removeComponent()
		$$('componentWebMain').loadComponent('/Components/BillDetail.waComponent');
		if (componentWebMain_varJsonDetail.summary !==undefined) {			
			$('#componentWebMain_richTextSummary').html("<p class='Title'>" + componentWebMain_varJsonDetail.title + "</p>" + componentWebMain_varJsonDetail.summary)
			}
		else {
			$('#componentWebMain_richTextSummary').html("<p class='Title'>" + componentWebMain_varJsonDetail.title + "</p>")
		}		
	};// @lock

	menuItemHistory.click = function menuItemHistory_click (event)// @startlock
	{// @endlock
		try {
			$$('componentWebMain').loadComponent('/Components/CandidateHistory.waComponent');
			
	
	} catch (e) {

	}
	};// @lock

	menuItemAbout.click = function menuItemAbout_click (event)// @startlock
	{// @endlock
		try {
			$$('componentWebMain').loadComponent('/Components/Splash.waComponent');
	
		} catch (e) {

		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//setTimeout(function(){setupPage()},5000);

	};// @lock

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
		setupPage()
		} catch (e) {
		alert(e.message);
		}

	};// @lock
	


// @region eventManager// @startlock
	WAF.addListener("menuCandidates", "click", menuCandidates.click, "WAF");
	WAF.addListener("menuBillDetail", "click", menuBillDetail.click, "WAF");
	WAF.addListener("menuItemHistory", "click", menuItemHistory.click, "WAF");
	WAF.addListener("menuItemAbout", "click", menuItemAbout.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("menuItemFind", "click", menuItemFind.click, "WAF");
	WAF.addListener("menuItemState", "click", menuItemState.click, "WAF");
	WAF.addListener("componentWebMain", "click", componentWebMain.click, "WAF");
// @endregion
};// @endlock

	function setupPage() {
		stateName=getState('trackerState')
		if (stateName !==null) {
			stateName=stateName.toUpperCase();
		}
		$$('richTextStateName').setValue(stateName)	

		//var apiKey=openStates.openstates_api_key()
		//var varStr='http://openstates.org/api/v1/legislators/?state=' + stateName.toLowerCase() + '&apikey=' + apiKey;
		//debugger;
		//callURL(varStr)				
		if ($$('componentWebMain').config['data-path']=="/Components/Splash.waComponent") {
		$$('componentWebMain').removeComponent();
		$$('menuBarWebMain').show()			
		}
	}
	
