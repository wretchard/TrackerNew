
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
		$('#componentWebMain_containerDetail').html('')
		switch(this.getValue()) {
		case 'action':
		drawAction(componentWebMain_varJsonDetail.actions);
		break;
		case 'sponsor':
		drawSponsor(componentWebMain_varJsonDetail.sponsors);
		break;
		case 'vote':
		drawVote(componentWebMain_varJsonDetail.votes);
		break;
		case 'yes':
		drawYes(componentWebMain_varJsonDetail.votes);
		break;
		case 'no':
		drawNo(componentWebMain_varJsonDetail.votes);
		break;
	}

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_radioChoice", "change", radioChoice.change, "WAF");
	// @endregion// @endlock

	};// @lock

function drawAction(data) {
	"use strict";
	//debugger;
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				  return d.date + ", " + d.actor + ", " + d.action
			  });

	
	
};

function drawSponsor(data) {
	"use strict";
	//debugger;
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				  return d.leg_id + ", " + d.name + ", " + d.official_type;
			  });

	
	
};

function drawVote(data) {
	"use strict";
	//debugger;
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				  return d.date + ", "  + d.chamber + ", " + d.motion + ", " + ", no count: " + d.no_count + ", yes count:" + d.yes_count;
			  });

	
	
};

function drawYes(data) {
	"use strict";
	//debugger;
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				  return "to be implemented"
			  });	
};

function drawNo(data) {
	"use strict";
	//debugger;
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				  return "to be implemented"
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
			componentWebMain_varJsonDetail=e;
			$('#componentWebMain_richTextSummary').html(componentWebMain_varJsonDetail.summary)
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
