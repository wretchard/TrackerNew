
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
		alert('not yet implemented');
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonVotingRecord", "click", buttonVotingRecord.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock

