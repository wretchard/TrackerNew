
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
		callURL(varStr);


	// @region namespaceDeclaration// @startlock
	var radioChoice = {};	// @radioGroup
	// @endregion// @endlock

	// eventHandlers// @lock

	radioChoice.change = function radioChoice_change (event)// @startlock
	{// @endlock
		alert(this.getValue());
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_radioChoice", "change", radioChoice.change, "WAF");
	// @endregion// @endlock

	};// @lock
function callURL(varStr) {
	 $.ajax(
	 {
	 	url:varStr,
	 	type:"GET",
	 	dataType:"jsonp",
	 	async:true,
	 	success: function(e) {
			parseE(e);
	 		},
	 	error: function() {
	 		alert('error');
	 		}
	 }
	 );
	}
function parseE(e) {
	objActions=e.actions;
	componentWebMain_arrActions=[];
	for (var i=0; i<objActions.length; i++) {
		componentWebMain_arrActions.push({
		action:objActions[i].action,
		actor:objActions[i].actor,
		date:objActions[i].date
		});
	};
		sources.componentWebMain_arrActions.sync();
}
}// @startlock
return constructor;
})();// @endlock
