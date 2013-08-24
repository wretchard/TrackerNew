
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Candidate';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	loadData()

function loadData() {
	var stateName=$$('richTextStateName').getValue();
	var apiKey=openStates.openstates_api_key();
	var varStr='http://openstates.org/api/v1/legislators/?state=' + stateName.toLowerCase() + '&apikey=' + apiKey;
	$('#componentWebMain_richText5').html("Processing ...")
	callURL(varStr);
	
	$('#componentWebMain_dataGridCandidate').hover(
		function() {
			$('#componentWebMain_richText5').html('Click row to see detail');
		},
		
		function() {
			$('#componentWebMain_richText5').html('');
		}
	);
	
	$('#componentWebMain_buttonVotingRecord').hover(
		function() {
			$('#componentWebMain_richText5').html("See selected legislator's voting record");
		},
		
		function() {
			$('#componentWebMain_richText5').html('');
		}
	);

	$('#componentWebMain_buttonFind').hover(
		function() {
			$('#componentWebMain_richText5').html("Narrow to searched name");
		},
		
		function() {
			$('#componentWebMain_richText5').html('');
		}
	);
	
	$('#componentWebMain_textSearchCandidate').hover(
		function() {
			$('#componentWebMain_richText5').html("Enter legislator last name");
		},
		
		function() {
			$('#componentWebMain_richText5').html('');
		}
	);
	
	
	$('#componentWebMain_richText3').hover(
		function() {
			$('#componentWebMain_richText5').html("Click to official site");
		},
		
		function() {
			$('#componentWebMain_richText5').html('');
		}
	);	

	$('#componentWebMain_richText3').click(
		function() {
			window.open($$('componentWebMain_richText3').getValue(), "_blank");
		}
	);		
	//				
}	

function callURL(varStr) {
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
	 $('#componentWebMain_richText1').html('Retrieving records ...');
	}
	
function refreshPage() {
	source.componentWebMain_arrStateCandidate.sync();
	$('#componentWebMain_richText5').html("")
}
	
function parseBill(objJson, callback) {
	//debugger;
	componentWebMain_arrStateCandidate=[];
	for (var i=0; i<objJson.length; i++) {
		varCand=objJson[i];
		componentWebMain_arrStateCandidate.push(
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

	// @region namespaceDeclaration// @startlock
	var buttonVotingRecord = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonVotingRecord.click = function buttonVotingRecord_click (event)// @startlock
	{// @endlock
		//debugger;
		candidateID=source.componentWebMain_arrStateCandidate.leg_id
		if (source.arrBill == undefined) {
			$('#componentWebMain_richText5').html("Please do a bill search first")
		}
		else {
			candidateVoteHistory(candidateID);
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonVotingRecord", "click", buttonVotingRecord.click, "WAF");
	// @endregion// @endlock

	};// @lock

function candidateVoteHistory	(candidateID) {

	varApi=openStates.openstates_api_key();
	var i;
	//clear candidate vote record
	componentWebMain_arrCandVote=[];
	$('#componentWebMain_richText5').html('')
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

function showRecord(i, lEngth) {
//debugger;
if(i<lEngth-1) {

	$('#componentWebMain_richText5').html("processing ...");
}
else {
	$$('componentWebMain').removeComponent();
	$$('componentWebMain').loadComponent('/Components/CandidateHistory.waComponent');
}
}
	
}// @startlock
return constructor;
})();// @endlock

