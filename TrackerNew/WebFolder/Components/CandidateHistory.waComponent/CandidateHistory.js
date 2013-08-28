
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'CandidateHistory';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	leg_id =$$('componentWebMain_richText2').getValue()
	$$('componentWebMain_richText1').setValue(cDetails(leg_id).full_name + ", " + cDetails(leg_id).party)

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock

function cDetails(leg_id) {
	s=arrStateCandidate
	for (var i=0; i<s.length; i++) {
		if(s[i].leg_id == leg_id) {
			return s[i]
		}
	}
}