
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

var stateCookie;

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Find';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var dataGridBill = {};	// @dataGrid
	var buttonStart = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock
	var varApi;
	
	dataGridBill.onRowDblClick = function dataGridBill_onRowDblClick (event)// @startlock
	{// @endlock
		//debugger;
		/*var varBillID=sources.componentWebMain_arrBill.bill_id;
		var varsessionID=sources.componentWebMain_arrBill.session;
		$$('componentWebMain').removeComponent();
		$$('componentWebMain').loadComponent({path:'/Components/BillDetail.waComponent',
		userData:{billID:varBillID, sessionID:varsessionID, api:varApi}})*/
	};// @lock

	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		varApi=openStates.openstates_api_key();
		var stateCookie = getStateCookie('trackerState')
		var apiString='http://openstates.org/api/v1/bills/?state=' + stateCookie + '&q=' + $$('componentWebMain_textSearch').getValue() + '&apikey=' + varApi
		//debugger;
		componentWebMain_varJson = openStates.readJson(apiString)
		parseBill(componentWebMain_varJson.result)
	};// @lock
	
function parseBill(objJson) {
	componentWebMain_arrBill=[];
	for (var i=0; i<objJson.length; i++) {
		varBill=objJson[i];
		componentWebMain_arrBill.push({session:varBill.session, 
		bill_id:varBill.bill_id, 
		chamber:varBill.chamber, 
		title:varBill.title, 
		updated:varBill.session.updated});
	};
	//o={session:'zz', bill_id:'zzz', chamber:'upper', title:'bloop', updated:'july 16, 2013'}
	sources.componentWebMain_arrBill.sync()
}

getStateCookie =function getCookie(c_name)
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
	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGridBill", "onRowDblClick", dataGridBill.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_buttonStart", "click", buttonStart.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
