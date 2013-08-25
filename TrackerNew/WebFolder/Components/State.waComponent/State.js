
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'State';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		


	// @region namespaceDeclaration// @startlock
	var comboState = {};	// @combobox
	// @endregion// @endlock

	// eventHandlers// @lock

	comboState.change = function comboState_change (event)// @startlock
	{// @endlock
		source.varStateName = this.getValue();
		setStateCookie('trackerState',source.varStateName,7)
		$$('richTextStateName').setValue(source.varStateName.toUpperCase())
	};// @lock
	
setStateCookie = function setCookie(c_name,value,exdays)
{
//debugger;
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_comboState", "change", comboState.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
