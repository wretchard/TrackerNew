function enumerateAllTables() {
try {
	
	//blank the dataclass
	TheBlank = ds.UtilCountClasses.all();
	TheBlank.remove();
	ThisDate=Date();
	
	for (var vName in ds.dataClasses)  // put each datastore class of ds
	{
		TheDataClass=ds.dataClasses[vName];
		vValue = TheDataClass.length;
		TheUtilCountClass=ds.UtilCountClasses.find('className=:1', vName)
		if (!TheUtilCountClass) {
			TheUtilCountClass=ds.UtilCountClasses.createEntity();
		}
		TheUtilCountClass.className=vName;
		TheUtilCountClass.recordCount=vValue;
		TheUtilCountClass.whenUpdated=ThisDate;
		TheUtilCountClass.save();
	};	
	return true;
}
catch (e) {
	console.log(e);
}
	};
	
	

function findDistinct(dataClassName, dataAttribute) {
try {
	TheDataClass=ds[dataClassName];
	dV=TheDataClass.distinctValues(dataAttribute)
	return dV;
} catch (e) {
	return(e.toString());
}
	
}

enumerateAllTables();

//x=findDistinct('LegislativeEvent', 'type');
//x;