
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
			.attr('id', 'Action')					
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				 return String.fromCharCode(8226) + " " + d.date + ", " + d.actor + ", " + d.action
			  });
		$('#Action').before("<p class='Title'>Actions Taken</p>")

	
	
};

function drawSponsor(data) {
	"use strict";
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.attr('id', 'Action')
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				  return String.fromCharCode(8226) + " " + d.leg_id + ", " + d.name + ", " + d.official_type;
			  });
		$('#Action').before("<p class='Title'>Sponsors</p>")
	
	
};

function drawVote(data) {
	"use strict";
	//debugger;
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.attr('id', 'Action')			
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				  return String.fromCharCode(8226) + " " + d.id + ", " + d.date + ", "  + d.chamber + ", " + d.motion.replace(/,/g, '') + ", no count: " + d.no_count + ", yes count:" + d.yes_count;
			  })	
			 .on('click', findElectionID);
		$('#Action').before("<p class='Title'>Votes</p>")			 	
};

function findElectionID() {
	b=(this.textContent).split(",");
	var subj=b[3];
	b=b[0].split(" ");
	b=b[1];
	for (var i=0; i<componentWebMain_varJsonDetail.votes.length; i++) {
		if (componentWebMain_varJsonDetail.votes[i].id == b) {
			drawYes(componentWebMain_varJsonDetail.votes[i].yes_votes, subj, function() {drawNo(componentWebMain_varJsonDetail.votes[i].no_votes)});
			
		}
	}
	
}

function drawYes(data, subj, callback) {
		"use strict";
		$('#componentWebMain_containerDetail').html('');
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.attr('id', 'Action')
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.text(function (d) {
				  return String.fromCharCode(8226) + " " + d.leg_id + ", " + d.name 
			  })
		$('#Action').before("<p class='Title'>Voted Yes to '" + subj + "'</p>")	
		callback();
};

function drawNo(data) {
	"use strict";
	$('#componentWebMain_containerDetail').append("<p class='Title'>Voted No</p>")
	$('#componentWebMain_containerDetail').append("<ul id='no'></ul>")
	d3.select('#no')
		.selectAll("li")
		.data(data)
		.enter()
		.append("li")
		.text(function (d) {
			  return String.fromCharCode(8226) + " " + d.leg_id + ", " + d.name 
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
