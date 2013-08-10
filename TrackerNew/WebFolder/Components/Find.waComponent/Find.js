
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

var stateCookie;

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Find';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		$('#componentWebMain_dataGridBill').hover(
		function() {
			$('#componentWebMain_richText1').html('Click result to see detail');
		},
		
		function() {
			$('#componentWebMain_richText1').html('');
		}
		);
		
		$('#componentWebMain_textSearch').hover(
		function() {
			$('#componentWebMain_richText1').html('Leave blank to find all. Some states may take too long.');
		},
		
		function() {
			$('#componentWebMain_richText1').html('');
		}		
		);
		

	// @region namespaceDeclaration// @startlock
	var textSearch = {};	// @textField
	var dataGridBill = {};	// @dataGrid
	var buttonStart = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	textSearch.keydown = function textSearch_keydown (event)// @startlock
	{// @endlock

		if(event.keyCode == 13)
		{
    		searchClick();
		}

	};// @lock
	var varApi;
	
	dataGridBill.onRowClick = function dataGridBill_onRowClick (event)// @startlock
	{// @endlock
		rowClickCustom();
	};// @lock
	
	function rowClickCustom() {
		varApi=openStates.openstates_api_key();
		var varBillID=sources.componentWebMain_arrBill.bill_id;
		var varsessionID=sources.componentWebMain_arrBill.session;
		$$('componentWebMain').removeComponent()
		$$('componentWebMain').loadComponent({path:'/Components/BillDetail.waComponent',
		userData:{billID:varBillID, sessionID:varsessionID, api:varApi}})
	}
	
	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		searchClick();
	};// @lock
	
	function searchClick () {
		varApi=openStates.openstates_api_key();
		var stateCookie = getStateCookie('trackerState')
		var apiString='http://openstates.org/api/v1/bills/?state=' + stateCookie + '&q=' + $$('componentWebMain_textSearch').getValue() + '&apikey=' + varApi
		callURL(apiString);		
	}
	
function callURL(varStr) {
	 $.ajax(
	 {
	 	url:varStr,
	 	type:"GET",
	 	dataType:"jsonp",
	 	async:true,
	 	success: function(e) {
	 		parseBill(e);
	 		},
	 	error: function() {
	 		alert('error');
	 		}
	 }
	 );
	 $('#componentWebMain_richText1').html('Retrieving records ...');
	}
	
function parseBill(objJson) {
	//debugger;
	componentWebMain_arrBill=[];
	for (var i=0; i<objJson.length; i++) {
		varBill=objJson[i];
		componentWebMain_arrBill.push({session:varBill.session, 
		bill_id:varBill.bill_id, 
		chamber:varBill.chamber, 
		title:varBill.title, 
		updated:varBill.session.updated});
	};
	sources.componentWebMain_arrBill.sync()
	$('#componentWebMain_richText1').html('Retrieval complete');
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
	WAF.addListener(this.id + "_textSearch", "keydown", textSearch.keydown, "WAF");
	WAF.addListener(this.id + "_dataGridBill", "onRowClick", dataGridBill.onRowClick, "WAF");
	WAF.addListener(this.id + "_buttonStart", "click", buttonStart.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
