
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'BillDetail';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		varStr=prepURL(data);
		callURL(varStr);
		if (sources.arrStateCandidate !== undefined) {
			refreshPage();
		}
		else {
			loadLegislatorData();
		}
		


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
	
function loadLegislatorData() {
	var stateName=$$('richTextStateName').getValue();
	var apiKey=openStates.openstates_api_key();
	var varStr='http://openstates.org/api/v1/legislators/?state=' + stateName.toLowerCase() + '&apikey=' + apiKey;
	callURLCand(varStr)	
};

function callURLCand(varStr) {
	 $.ajax(
	 {
	 	url:varStr,
	 	type:"GET",
	 	dataType:"jsonp",
	 	async:true,
	 	success: function(e) {
	 		componentWebMain_varStateCandidate=e;
	 		parseBill(e,refreshPage);
	 		},
	 	error: function() {
	 		alert('error');
	 		}
	 }
	 );
	}
	
function refreshPage() {
	$$('componentWebMain_radioChoice').show();
}

function parseBill(objJson, callback) {
	arrStateCandidate=[];
	for (var i=0; i<objJson.length; i++) {
		varCand=objJson[i];
		arrStateCandidate.push(
		{party:varCand.party, 
		chamber:varCand.chamber, 
		district:varCand.district, 
		full_name:varCand.full_name,
		first_name:varCand.first_name,
		last_name:varCand.last_name,
		leg_id:varCand.leg_id,
		photo_url:varCand.photo_url,
		url:varCand.url});
	};
	callback();
}	

function drawAction(data) {
	"use strict";
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

function prepURL(data) {
		varState = $$('richTextStateName').getValue();
		varStr= "http://openstates.org/api/v1/bills/" + varState;
		varStr= varStr + "/" + data.userData.sessionID;
		varStr= varStr + "/" + data.userData.billID; 
		varStr= varStr + "/?apikey=" + data.userData.api;
		return varStr;	
	}

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
				  var strMsg = String.fromCharCode(8226) + " " + d.leg_id + ", " + d.official_type + ", " + d.name
				  var strAdd = ", " + cDetails(d.leg_id).first_name + ", " + cDetails(d.leg_id).party;
				  return strMsg + strAdd;
			  });
		$('#Action').before("<p class='Title'>Sponsors</p>")
	
	
};

function cDetails(leg_id) {
	try {
	s=arrStateCandidate
		for (var i=0; i<s.length; i++) {
			if(s[i].leg_id == leg_id) {
			return s[i]
			}
	 	}	
} catch (e) {

}
		return {'first_name':'unknown first name', 'full_name':'unknown full name', 'party':'unknown party'}
		//a=s[i].leg_id;

}

function drawVote(data) {
	"use strict";
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.attr('id', 'Action')			
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.on("mouseenter", showYesDetail)
			.on("mouseleave", showNoDetail)
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
		//debugger;
		"use strict";
		$('#componentWebMain_containerDetail').html('');
		d3.select('#componentWebMain_containerDetail')
			.append("ul")
			.attr('id', 'Action')
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.on("mouseenter", showVoterDetailIn)
			.on("mouseleave", showVoterDetailOut)			
			.text(function (d) {
				  var strMsg = String.fromCharCode(8226) + " " + d.leg_id + ", " + d.name
				  var strAdd = ", " + cDetails(d.leg_id).first_name + ", " + cDetails(d.leg_id).party;
				  return strMsg + strAdd
			  })
			 .on('click', candidateVoteHistory);
		$('#Action').before("<p class='Title'>Voted Yes to '" + subj + "'</p>")
		callback()	
};


function drawNo(data, subj) {
		"use strict";
		d3.select('#Action')
			.append("ul")
			.attr('id', 'no')
			.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.on("mouseenter", showVoterDetailIn)
			.on("mouseleave", showVoterDetailOut)			
			.text(function (d) {
				  var strMsg = String.fromCharCode(8226) + " " + d.leg_id + ", " + d.name
				  var strAdd = ", " + cDetails(d.leg_id).first_name + ", " + cDetails(d.leg_id).party;
				  return strMsg + strAdd
			  })
			 .on('click', candidateVoteHistory);
		$('#no').before("<p class='Title'>Voted No</p>")	

};

function showVoterDetailIn() {
		$('#componentWebMain_richText2').html('Click to search Bill selection for candidate votes');
}

function showVoterDetailOut() {
		$('#componentWebMain_richText2').html('');
}
function showYesDetail() {
		$('#componentWebMain_richText2').html('Click to see who voted for what');
}

function showNoDetail() {
		$('#componentWebMain_richText2').html('');
}


function candidateVoteHistory	() {
	varApi=openStates.openstates_api_key();
	b=(this.textContent).split(",");
	b =b[0];
	b=b.split(" ");
	candidateID=b[1];
	var i;
	//clear candidate vote record
	componentWebMain_arrCandVote=[];
	$('#componentWebMain_richText2').html('')
	for(i=0;i<arrBill.length; i++) {
		(function(i){
		varState = $$('richTextStateName').getValue();
		varStr= "http://openstates.org/api/v1/bills/" + varState;
		varStr= varStr + "/" + arrBill[i].session;
		varStr= varStr + "/" + arrBill[i].bill_id; 
		varStr= varStr + "/?apikey=" + varApi;
		callURL2(varStr, candidateID, arrBill[i].title, i, arrBill.length);
		}
		(i))
	};
	
}

function showRecord(i, lEngth) {
//debugger;
if(i<lEngth-1) {

	$('#componentWebMain_richText2').html("processing ...");
}
else {
	$$('componentWebMain').removeComponent();
	$$('componentWebMain').loadComponent('/Components/CandidateHistory.waComponent');
}
}

function parseVotes(e, candidateID, title) {
	for (var i=0; i<e.votes.length; i++) {
		for (var j=0; j<e.votes[i].no_votes.length; j++)
		{
			if (candidateID == e.votes[i].no_votes[j].leg_id) {
			//debugger;
			componentWebMain_arrCandVote.push({
				candidateID:candidateID, 
				name:e.votes[i].yes_votes[j].name,
				voteValue:'no', 
				billTitle:title, 
				motion_id:e.votes[i].id, 
				motion:e.votes[i].motion})
			}
		}
		
		for (var k=0; k<e.votes[i].yes_votes.length; k++)
		{
			if (candidateID == e.votes[i].yes_votes[k].leg_id) {
			//debugger;
			componentWebMain_arrCandVote.push({
				candidateID:candidateID, 
				name:e.votes[i].yes_votes[k].name,
				voteValue:'yes', 
				billTitle:title, 
				motion_id:e.votes[i].id, 
				motion:e.votes[i].motion})
			}
				
		}		
			
	}

	
}


function callURL2(varStr, candidateID, title, i, l) {
	 $.ajax(
	 {
	 	url:varStr,
	 	type:"GET",
	 	dataType:"jsonp",
	 	async:true,
	 	success: function(e) {
			parseVotes(e, candidateID, title);
			showRecord(i,l);
	 		},
	 	error: function() {
	 		alert('error');
	 		}
	 }
	 );
	}
	
function callURL(varStr) {
	 $.ajax(
	 {
	 	url:varStr,
	 	type:"GET",
	 	dataType:"jsonp",
	 	async:true,
	 	success: function(e) {
			componentWebMain_varJsonDetail=e;
			if (componentWebMain_varJsonDetail.summary !==undefined) {			
			$('#componentWebMain_richTextSummary').html("<p class='Title'>" + componentWebMain_varJsonDetail.title + "</p>" + componentWebMain_varJsonDetail.summary)
			}
			else {
			$('#componentWebMain_richTextSummary').html("<p class='Title'>" + componentWebMain_varJsonDetail.title + "</p>")
			}
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
