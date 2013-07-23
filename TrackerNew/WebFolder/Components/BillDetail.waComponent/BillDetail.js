
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'BillDetail';
	// @endregion// @endlock

	this.load = function (data) {// @lock

		var a;
		varState = $$('richTextStateName').getValue();
		varStr= "http://openstates.org/api/v1/bills/" + varState;
		varStr= varStr + "/" + data.userData.sessionID;
		varStr= varStr + "/" + data.userData.billID; 
		varStr= varStr + "/?apikey=" + data.userData.api;
		$$('componentWebMain_richText1').setValue(varStr);
		callURL(varStr);


	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock
function callURL(varStr) {
	 $.ajax(
	 {
	 	url:varStr,
	 	type:"GET",
	 	dataType:"jsonp",
	 	async:false,
	 	success: function(e) {
	 		debugger;
			return e;
	 		},
	 	error: function() {
	 		alert('error');
	 		}
	 }
	 );
	}

}// @startlock
return constructor;
})();// @endlock
