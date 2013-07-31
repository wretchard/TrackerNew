
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
		//alert(this.getValue());
		switch(this.getValue()) {
		case 'action':
		//draw('action')
		break;
		case 'sponsor':
		//draw('sponsor')
		break;
		case 'vote':
		//draw('vote')
		break;
	}
			data= {	"status": ["GOOD SERVICE"],
			"name": ["123"],
			"url": [null],
			"text": ["..."],
			"plannedworkheadline": [null],
			"Time": [" 7:35AM"],
			"Date": ["12/15/2011"]}
		componentWebMain_varJsonDetail=data;
	//$('#componentWebMain_containerDetail').html('')
	draw(data);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_radioChoice", "change", radioChoice.change, "WAF");
	// @endregion// @endlock

	};// @lock

function draw(data) {
	//debugger;
	"use strict";
	debugger;
	d3.select('componentWebMain_containerDetail')
		.append("ul")
		.selectAll("li")
		.data(data)
		.enter()
		.append("li")
		.text(function (d) {
			  return data.name + ": " + data.status;
		  });

	
	
};
	
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
