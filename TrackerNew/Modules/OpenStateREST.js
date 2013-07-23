	include ('Modules/Parseload.js');

	var STATE_LIST = {
	'AL': [1, 'Alabama'],
	'AK': [2, 'Alaska'],
	'AZ': [4, 'Arizona'],
	'AR': [5, 'Arkansas'],
	'CA': [6, 'California'],
	'CO': [8, 'Colorado'],
	'CT': [9, 'Connecticut'],
	'DE': [10, 'Delaware'],
	'FL': [12, 'Florida'],
	'GA': [13, 'Georgia'],
	'HI': [15, 'Hawaii'],
	'ID': [16, 'Idaho'],
	'IL': [17, 'Illinois'],
	'IN': [18, 'Indiana'],
	'IA': [19, 'Iowa'],
	'KS': [20, 'Kansas'],
	'KY': [21, 'Kentucky'],
	'LA': [22, 'Louisiana'],
	'ME': [23, 'Maine'],
	'MD': [24, 'Maryland'],
	'MA': [25, 'Massachusetts'],
	'MI': [26, 'Michigan'],
	'MN': [27, 'Minnesota'],
	'MS': [28, 'Mississippi'],
	'MO': [29, 'Missouri'],
	'MT': [30, 'Montana'],
	'NE': [31, 'Nebraska'],
	'NV': [32, 'Nevada'],
	'NH': [33, 'New Hampshire'],
	'NJ': [34, 'New Jersey'],
	'NM': [35, 'New Mexico'],
	'NY': [36, 'New York'],
	'NC': [37, 'North Carolina'],
	'ND': [38, 'North Dakota'],
	'OH': [39, 'Ohio'],
	'OK': [40, 'Oklahoma'],
	'OR': [41, 'Oregon'],
	'PA': [42, 'Pennsylvania'],
	'RI': [44, 'Rhode Island'],
	'SC': [45, 'South Carolina'],
	'SD': [46, 'South Dakota'],
	'TN': [47, 'Tennessee'],
	'TX': [48, 'Texas'],
	'UT': [49, 'Utah'],
	'VT': [50, 'Vermont'],
	'VA': [51, 'Virginia'],
	'WA': [53, 'Washington'],
	'WV': [54, 'West Virginia'],
	'WI': [55, 'Wisconsin'],
	'WY': [56, 'Wyoming'],
	'DC': [11, 'District of Columbia'],
	'PR': [72, 'Puerto Rico']
};

var BILL_SEARCH ={'q': ['state', 'search_window', 
	'chamber', 'bill_id__in', 'updated_since', 'subject',
	'sponsor_id']
	}
	
var LEGISLATOR_SEARCH ={'?': ['state', 'first_name',
	'last_name', 'chamber', 'active', 'term', 'district',
	'party']
	}
	
var LEGISLATOR_GEOSEARCH ={
	}

var API_TYPES = {
	'Metadata':STATE_LIST,
	'Bill':BILL_SEARCH,
	'Legislator':[],
	'Committee':[],
	'Event':[],
	'District':[]
	}

function RetrieveData(URLJson) {
try {

 var xhr, headers, result, resultObj, URLText, URLJson;
 var proxy = { // define a proxy only if necessary
     host: 'proxy.myserver.com', // use any valid proxy address
     port: 80
 }
   
 var headersObj = {};
   
 //xhr = new XMLHttpRequest(proxy); // instanciate the xhr object
 xhr = new XMLHttpRequest(); // instanciate the xhr object
    // the proxy parameter may not be necessary
   
 xhr.onreadystatechange = function() { // event handler
     var state = this.readyState;
     if (state !== 4) { // while the status event is not Done we continue
         return;
     }
     var headers = this.getAllResponseHeaders(); //get the headers of the response
     var result = this.responseText;  //get the contents of the response
     var headersArray = headers.split('\n'); // split and format the headers string in an array
     headersArray.forEach(function(header, index, headersArray) {
         var name, indexSeparator, value;
 
        if (header.indexOf('HTTP/1.1') === 0) { // this is not a header but a status          
             return; // filter it
         }
  
        indexSeparator = header.indexOf(':'); 
        name = header.substr(0,indexSeparator);
        if (name === "") {
            return;
        }
        value = header.substr(indexSeparator + 1).trim(); // clean up the header attribute
        headersObj[name] = value; // fills an object with the headers
     });
     if (headersObj['Content-Type'] && headersObj['Content-Type'].indexOf('json') !== -1) {  
             // JSON response, parse it as objects
         resultObj = JSON.parse(result);
     } 
     else if (['http://thomas.umeme.us/g-v6.txt', 'http://thomas.umeme.us/1-v6.txt', 'http://thomas.umeme.us/2-v6.txt',
		'http://thomas.umeme.us/2c-v6.txt', 'http://thomas.umeme.us/3-v6.txt', 'http://thomas.umeme.us/4-v6.txt', 
		'http://thomas.umeme.us/5-v6.txt', 'http://thomas.umeme.us/6-v6.txt', 'http://thomas.umeme.us/7-v6.txt', 
		'http://thomas.umeme.us/8-v6.txt', 'http://thomas.umeme.us/9-v6.txt', 'http://thomas.umeme.us/10-v6.txt','http://thomas.umeme.us/11-v6.txt',
		'http://thomas.umeme.us/12-v6.txt', 'http://thomas.umeme.us/13-v6.txt', 'http://thomas.umeme.us/14-v6.txt',
		'http://thomas.umeme.us/15-v6.txt', 'http://thomas.umeme.us/16-v6.txt', 'http://thomas.umeme.us/17-v6.txt'].indexOf(URLJson)>=0) 
		{
     	resultObj = JSON.parse(result);
     	}
     else if (
     	headersObj['Content-Type'] && headersObj['Content-Type'].indexOf('json') == -1)
     	{resultObj = JSON.parse(result);}
     else
	 { // not JSON, return text
         resultTxt = result;
     }
 };
  
 xhr.open('GET', URLJson);  
 //xhr.open('GET', URLText); // to connect to a Web site
   // or xhr.open('GET', URLJson) to send a REST query to a Wakanda server
   
 xhr.send(); // send the request
statusLine = xhr.status + ' ' + xhr.statusText; // get the status
 
 // we build the following object to display the responses in the code editor
 var jObj = ({
     statusLine: statusLine,
     headers: headersObj,
     result: resultObj || resultTxt
 });
 
//var jStr = JSON.stringify(jObj);
return jObj;
}
catch(error) {
	console.log(error);
}
}

function LegislatorName(inputArray) {
	try{
	var v={}; 
	rValue=inputArray.split(",");
	v['lastname']=rValue[0]
	v['initial']=rValue[1]
	return v;}
	catch(error) {
		console.log(error);
	}

}


function SaveStateMeta(varURL) {
	try {
		
	var result=RetrieveData(varURL).result;
	
//look for existing record
	StateMeta=ds.StateMetadata.find('open_id= :1', result.id)
	if (StateMeta == null)
	{StateMeta= ds.StateMetadata.createEntity();
	StateMeta.open_id=result.id;	}
	
	StateMeta.name=result.name;
	StateMeta.abbreviation=result.abbreviation;
	StateMeta.legislature_name=result.legislature_name;
	StateMeta.upper_chamber_name=result.upper_chamber_name;
	StateMeta.lower_chamber_name=result.lower_chamber_name;
	StateMeta.upper_chamber_term=result.upper_chamber_term;
	StateMeta.lower_chamber_term= result.lower_chamber_term;
	StateMeta.upper_chamber_title=result.upper_chamber_title;
	StateMeta.lower_chamber_title=result.lower_chamber_title;
	StateMeta.latest_dump_url=result.latest_json_url;
	StateMeta.latest_dump_date=result.latest_json_date;
	
	StateMeta.save();		
	
	//Term related records
	//Remove old records first

	
	TheSessionDetail = ds.Session_detail.query('session_detail.state.open_id= :1', result.id)
	if (TheSessionDetail) {TheSessionDetail.remove();}
	
	Flags = ds.Feature_flag.query('feature_flags.open_id= :1', result.id)
	if (Flags) {Flags.remove();}
	
	StateTerm=ds.Term.query('state.open_id= :1', result.id)
	if (StateTerm) {StateTerm.remove();} 
	
	for (var t in result.terms) 
	{
		Term(result.terms[t], StateMeta)
	}
	
	//Feature flag related records
	for (var t in result.feature_flags) 
	{
		FeatureFlags(result.feature_flags[t], StateMeta)
	}
	
}
catch(error) {
	console.log(error);
}
}

function Term(r, StateMeta) {
	try {
	StateTerm= ds.Term.createEntity();	
	StateTerm.start_year=r.start_year;
	StateTerm.end_year=r.end_year;
	StateTerm.name=r.name;
	StateTerm.state=StateMeta;
	StateTerm.save();
		
	for (var t in r.sessions) 
	{
	SessionX(r.sessions[t], StateTerm)
	}
}
catch(error) {
	console.log(error);
}
}

function FindBill(straightName) {
	
	try {
		TheBill=ds.Bill.find('bill_id= :1', straightName)
		if (TheBill) {
			return TheBill;
		}
		else {
			return null;
		}
	}
	catch (error) {
		
	}
}

function FindLegislator(lastname, initial, state) {
	
	try {
	if(initial !== undefined){
	var numEnd=initial.length-1
	var iName=initial.slice(0,numEnd) + "*";
	iName = iName.replace(/^\s+|\s+$/g,'')
	var strQry = "last_name='" + lastname + "' and first_name like '" + iName + "' and state= '" + state + "'"
	}
	else {
	var strQry = "last_name='" + lastname + "' and state= '" + state + "'"	
	}
	var TheLegislator=ds.Legislator.query(strQry);
	if(TheLegislator.length==1) {
		return TheLegislator[0];
	}
	else {
		//throw new Error("More than one legislator has been found.")
		return null;
	}
	}
	catch (error) {
		console.log(error);
	}
}


function FeatureFlags(r, StateMeta) {
		Flag = new ds.Feature_flag({
			subjects:r})
		Flag.feature_flags=StateMeta;
		Flag.save();
}

function SessionX(session, StateTerm) {
		StateSession = new ds.Session_detail({
			display_name:session
			})
		StateSession.session_detail=StateTerm;
		StateSession.save();
}

function Flag(r, RelID, StateMeta) {
		StateFlag = new ds.FeatureFlag({
			item:r
			})
		StateFlag.state=StateMeta;
		StateFlag.save();
}

function ClearOpenStateData(arg) {
	
	switch(arg)
	{
	case 'StateMetaData':
		var Table_List = ['Feature_flag', 'Session_detail', 
		'StateMetadata', 'Term'	]
		break;
	case 'Bill':
		var Table_List = ['Bill', 'BillType', 'BillSubject']
		break;
	case 'Legislator':
		var Table_List = ['Legislator']
		break;
	case 'Committee':
		var Table_List = ['Committee', 'Member', 'Source']
		break;
	case 'Event':
		var Table_List = ['Event']
		break;
	case 'District':
		var Table_List = ['District']
		break
	case 'VoteRecord':
		var Table_List = ['TocqueVote', 'LegislatorVoter'];
		break;
	case 'ParseGeneral':
		var Table_List = ['LegislativeSession', 'LegislativeBill', 
		'LegislativeChamber', 'LegislativeVerb', 'LegislativeWhen', 
		'LegislativeEvent',  'LegislativeLink', 'LegislativeWho', 'LegislativeSessionMap',
		'LegislativeStatementofVote', 'LegislativeRecordedVote'];
		break;
	case 'ParseDetail':
		var Table_List = [];
		break;		
	case 'All':
		var counter;
		for (var vName in ds.dataClasses)  // put each datastore class of ds
		{
		counter=ds.dataClasses[vName];
		counter.remove();
		};	
		break;				
	default:
		var Table_List = []	
	}
	
	for (t in Table_List)
	{
		var vName= Table_List[t];
		counter=ds.dataClasses[vName];
		counter.remove();
		counter.setAutoSequenceNumber(1);
	}
}

function StringMaker() {
	var result = SystemWorker.exec('cmd /u /c "dir C:\\"');
	return result.output.toString("ucs2");
}

function GetKeys(obj) {
	var keys=[];
	for (var key in obj){
		keys.push(key);
		}
	return keys;
}

function SaveLegislator(varURL) {
	var result=RetrieveData(varURL).result;
	var house="";
	if (varURL.indexOf('chamber=upper')>0) {
	house='upper';
	} else if (varURL.indexOf('chamber=lower')>0)
	{
	house='lower';
	}

	for (var t in result)
	{
	//look for existing record
	TheLegislator=ds.Legislator.find('open_id= :1', result[t].id)
	if (TheLegislator == null)
	{TheLegislator= ds.Legislator.createEntity();}	
	
	TheLegislator.last_name=result[t].last_name;
	TheLegislator.updated_at=result[t].updated_at;
	TheLegislator.full_name=result[t].full_name;
	TheLegislator.open_id=result[t].id;
	TheLegislator.first_name=result[t].first_name;
	TheLegislator.middle_name=result[t].middle_name;
	TheLegislator.district=result[t].district;
	TheLegislator.state=result[t].state;
	TheLegislator.party=result[t].party;
	TheLegislator.leg_id=result[t].leg_id;
	TheLegislator.active=result[t].active;
	TheLegislator.photo_url=result[t].photo_url;
	TheLegislator.created_at=result[t].created_at;
	if (result[t].chamber){
	TheLegislator.chamber=result[t].chamber;
		}
	else {
		TheLegislator.chamber=house;
		}
	TheLegislator.suffixes=result[t].suffixes;
	TheLegislator.save();		
	
	}	
}

function SaveCommittee(varURL) {
	var result=RetrieveData(varURL).result;
	TheCommittee=ds.Committee.find('id= :1', result.id)
	if (TheCommittee == null)
	{TheCommittee= ds.Committee.createEntity();}	
	TheCommittee.id=result.id;
	TheCommittee.committee=result.committee;
	TheCommittee.state=result.state;
	TheCommittee.chamber=result.chamber;
	TheCommittee.updated_at=result.updated_at;
	TheCommittee.created_at=result.created_at;
	TheCommittee.country=result.country;
	TheCommittee.level=result.level;
	TheCommittee.save();
	
	TheMember = ds.Member.query('members.id= :1', result.id)	
	if (TheMember){TheMember.remove();}	
	for (t in result.members)
	{
			TheMember =  ds.Member.createEntity();
			TheMember.leg_id=result.members[t].leg_id;
			TheMember.role=result.members[t].role;
			TheMember.name=result.members[t].name;
			TheMember.members=TheCommittee;
			TheMember.save();
	}
	
	TheSources = ds.Source.query('committee_sources.id= :1', result.id)	
	if (TheSources){TheSources.remove();}	
	for (t in result.sources)
	{
			TheSources =  ds.Source.createEntity();
			TheSources.url=result.sources[t].url;
			TheSources.committee_sources=TheCommittee;
			TheSources.save();
	}	
	
}

function SaveEvent(varURL) {
	try {
	var result=RetrieveData(varURL).result;
	for (var t in result)
	{
    //look for existing record
    for (t in result){
	TheEvent=ds.Event.find('id= :1', result[t].id)
	if (TheEvent == null)
	{TheEvent= ds.Event.createEntity();}
	TheEvent.id=result[t].id;
	TheEvent.type=result[t].committee;
	TheEvent.location=result[t].state;
	TheEvent.session=result[t].chamber;
	TheEvent.state=result[t].chamber;
	TheEvent.updated_at=result[t].chamber;
	TheEvent.when=result[t].chamber;
	TheEvent.created_at=result[t].chamber;
	TheEvent.description=result[t].description;
	TheEvent.end=result[t].end;
	TheEvent.save();	
	}
}
}
	catch(error) {
		onsole.log(error);
	}
}


function SaveDistrict(varURL) {
	try {
	var result=RetrieveData(varURL).result;
	for (var t in result)
	{
    //look for existing record
    for (t in result){
	TheDistrict=ds.District.find('id= :1', result[t].id)
	if (TheDistrict == null)
	{TheDistrict= ds.District.createEntity();}
	TheDistrict.id=result[t].id;
	TheDistrict.name=result[t].name;
	TheDistrict.chamber=result[t].chamber;
	TheDistrict.abbr=result[t].abbr;
	TheDistrict.boundary_id=result[t].boundary_id;
	TheDistrict.num_seats=result[t].num_seats;
	TheDistrict.save();	
	
	TheOldLegislator = ds.Legislator.query('district_legislators.id= :1', result[t].id)
	if (TheOldLegislator){TheOldLegislator.remove();}
	for (var v in result[t].legislators)
	{
		TheLegislator =  ds.Legislator.createEntity();
		TheLegislator.leg_id=result[t].legislators[v].leg_id;
		TheLegislator.full_name=result[t].legislators[v].full_name;
		TheLegislator.district_legislators=TheDistrict;
		TheLegislator.save();
		}
	}
	
}
}
catch (error) {
	console.log	(error);
}
}

function SaveIndividualBill(varURL) {
	try{
	var result=RetrieveData(varURL).result;
	TheBill=ds.Bill.find('id=:1', result.id);
	if (TheBill) {
		
		//sources
		//remove the old sources
		TheOldSources = ds.Source.query('sources.id= :1', result.id)
		if (TheOldSources){TheOldSources.remove();}	
		for (t in result.sources) {
			TheSource = ds.Source.createEntity();
			TheSource.url =result.sources[t].url;
			TheSource.sources=TheBill;
			TheSource.save();
			}
		//actions
		//remove the old actions
		TheOldBillAction = ds.Action.query('bill_action.id= :1', result.id)
		if (TheOldBillAction){TheOldBillAction.remove();}		
		for (t in result.actions) {
			TheAction = ds.Action.createEntity();
			TheAction.action_date=result.actions[t].date;
			TheAction.action=result.actions[t].action;
			TheAction.actor=result.actions[t].actor;
			TheAction.action_number=result.actions[t]["+action_number"];
			TheAction.bill_action=TheBill;
			TheAction.save();			
			}
		//sponsors
		//remove the old actions
		TheOldBillSponsor = ds.Sponsor.query('sponsored_bill.id= :1', result.id)
		if (TheOldBillSponsor){TheOldBillSponsor.remove();}
		for (t in result.sponsors) {
			TheSponsor = ds.Sponsor.createEntity();
			TheSponsor.leg_id=result.sponsors[t].leg_id;
			TheSponsor.official_type=result.sponsors[t].official_type;
			TheSponsor.type=result.sponsors[t].type;
			TheSponsor.name=result.sponsors[t].name;
			TheSponsor.sponsored_bill=TheBill;
			TheSponsor.save();			
			}			
		}
	}
	catch(error) {
		console.log(error);
		}
	}
	
	
function SaveParseGeneral(varURL) {
	var result=RetrieveData(varURL).result;
	FindType(result, 'general');
}

function SaveParse(varURL) {
	var result=RetrieveData(varURL).result;
	FindType(result, 'detail');
}

function SaveVoteRecord(varURL) {
	try {
	var result=RetrieveData(varURL).result;
	TheTocqueVote=ds.TocqueVote.find('state=:1 and record_number=:2', result.state, result.record_number);
	if(TheTocqueVote == null) {
		TheTocqueVote= ds.TocqueVote.createEntity();
		}
	TheTocqueVote.state=result.state;
	TheTocqueVote.record_number=result.record_number;
	TheTocqueVote.session=result.session;
	TheTocqueVote.house=result.house;
	TheTocqueVote.reading=result.reading;
	
	if (result.bill) {
		TheTocqueVote.bill=result.bill.join();
	}
	
	if (result.sponsered_by){
		TheTocqueVote.sponsered_by=result.sponsered_by.join();
	}
	
	if(result.bill_title) {
		TheTocqueVote.bill_title=result.bill_title.join();
	}
	
	//clear old 
	
	TheOldLegislatorVoter=ds.LegislatorVoter.query("bill_voted.ID=:1", TheTocqueVote.ID)
	if (TheOldLegislatorVoter) {
		TheOldLegislatorVoter.remove();
	}
	
	if(result.yeas) {
	try {
		var varName;
	
		for (t in result.yeas) { 
			varName=LegislatorName(result.yeas[t]);

			TheLegislator=FindLegislator(varName['lastname'], varName['initial'], 'tx');
			if(TheLegislator){
			TheLegislatorVoter=ds.LegislatorVoter.createEntity();
			TheLegislatorVoter.legislator=TheLegislator.ID;
			TheLegislatorVoter.bill_voted=TheTocqueVote.ID;
			TheLegislatorVoter.bill_val=FindBill(TheTocqueVote.straightName);
			TheLegislatorVoter.vote_value="yea";
			TheLegislatorVoter.save();
			}
			else {
				TheTocqueVote.yeas=TheTocqueVote.yeas + result.yeas[t];
			}
		}
	}
	catch(error) {
		console.log(error);
	}

	}
	
	if (result.nays) {
	try {
		var varName;
	
		for (t in result.nays) { 
			varName=LegislatorName(result.nays[t]);

			TheLegislator=FindLegislator(varName['lastname'], varName['initial'], 'tx');
			if(TheLegislator){
			TheLegislatorVoter=ds.LegislatorVoter.createEntity();
			TheLegislatorVoter.legislator=TheLegislator.ID;
			TheLegislatorVoter.bill_voted=TheTocqueVote.ID;
			TheLegislatorVoter.bill_val=FindBill(TheTocqueVote.straightName);
			TheLegislatorVoter.vote_value="nay";
			TheLegislatorVoter.save();
			}
			else {
				TheTocqueVote.yeas=TheTocqueVote.nays + result.nays[t];
			}
		}
	}
	catch(error) {
		console.log(error);
	}
	}
	
	if (result.present_not_voting) {
	try {
		var varName;
	
		for (t in result.present_not_voting) { 
			varName=LegislatorName(result.present_not_voting[t]);

			TheLegislator=FindLegislator(varName['lastname'], varName['initial'], 'tx');
			if(TheLegislator){
			TheLegislatorVoter=ds.LegislatorVoter.createEntity();
			TheLegislatorVoter.legislator=TheLegislator.ID;
			TheLegislatorVoter.bill_voted=TheTocqueVote.ID;
			TheLegislatorVoter.bill_val=FindBill(TheTocqueVote.straightName);
			TheLegislatorVoter.vote_value="present not voting";
			TheLegislatorVoter.save();
			}
			else {
				TheTocqueVote.yeas=TheTocqueVote.present_not_voting + result.present_not_voting[t];
			}
		}
	}
	catch(error) {
		console.log(error);
	}
	}
	
	if (result.absent_excused) {
	try {
		var varName;
	
		for (t in result.absent_excused) { 
			varName=LegislatorName(result.absent_excused[t]);

			TheLegislator=FindLegislator(varName['lastname'], varName['initial'], 'tx');
			if(TheLegislator){
			TheLegislatorVoter=ds.LegislatorVoter.createEntity();
			TheLegislatorVoter.legislator=TheLegislator.ID;
			TheLegislatorVoter.bill_voted=TheTocqueVote.ID;
			TheLegislatorVoter.bill_val=FindBill(TheTocqueVote.straightName);
			TheLegislatorVoter.vote_value="absent excused";
			TheLegislatorVoter.save();
			}
			else {
				TheTocqueVote.yeas=TheTocqueVote.absent_excused + result.absent_excused[t];
			}
		}
	}
	catch(error) {
		console.log(error);
	}
	}
	
	if (result.absent) {
	try {
		var varName;
	
		for (t in result.absent) { 
			varName=LegislatorName(result.absent[t]);

			TheLegislator=FindLegislator(varName['lastname'], varName['initial'], 'tx');
			if(TheLegislator){
			TheLegislatorVoter=ds.LegislatorVoter.createEntity();
			TheLegislatorVoter.legislator=TheLegislator.ID;
			TheLegislatorVoter.bill_voted=TheTocqueVote.ID;
			TheLegislatorVoter.bill_val=FindBill(TheTocqueVote.straightName);
			TheLegislatorVoter.vote_value="absent";
			TheLegislatorVoter.save();
			}
			else {
				TheTocqueVote.yeas=TheTocqueVote.absent + result.absent[t];
			}
		}
	}
	catch(error) {
		console.log(error);
	}
	}
	
	if (result.passed.yeas) {
		TheTocqueVote.passed_yeas=result.passed.yeas;	
	}

	if (result.passed.nays) {
		TheTocqueVote.passed_nays=result.passed.nays;	
	}
	
	if (result.passed.present_not_voting) {
		TheTocqueVote.passed_present_not_voting=result.passed.present_not_voting;	
	}			
	TheTocqueVote.save();

	
	TheOldTocqueStatementofVotes=ds.TocqueStatementofVote.query('tocquevote.state= :1 and tocquevote.record_number', result.state, result.record_number)				
	if (TheOldTocqueStatementofVotes){
		TheOldTocqueStatementofVotes.remove();
		}
	if ("statement-of-vote-list" in result) {
	for (t in result["statement-of-vote-list"]) {
		TheTocquePassed =  ds.TocqueStatementofVote.createEntity();
		TheTocquePassed.excuse=result["statement-of-vote-list"][t][0];
		TheTocquePassed.vote=result["statement-of-vote-list"][t][1];
		TheTocquePassed.who=result["statement-of-vote-list"][t][2];
		TheTocquePassed.tocquevote=TheTocqueVote;
		TheTocquePassed.save();
		}
	}
}
catch(error) {
	console.log(error);
}

}


function SaveBill(varURL) {
	try {
	var result=RetrieveData(varURL).result;
	for (var t in result)
	{
    //look for existing record
	TheBill=ds.Bill.find('bill_id= :1', result[t].bill_id)
	if (TheBill == null)
	{TheBill= ds.Bill.createEntity();}
	
	TheBill.title=result[t].title;
	TheBill.created_at=result[t].created_at;
	TheBill.updated_at=result[t].updated_at;
	TheBill.chamber=result[t].chamber;
	TheBill.state=result[t].state;
	TheBill.session=result[t].session;
	TheBill.bill_id=result[t].bill_id;
	TheBill.id=result[t].id;
	TheBill.save();	
	
	//remove the related BillTypes first
	TheOldBillType = ds.BillType.query('bill_type.id= :1', result[t].id)
	if (TheOldBillType){TheOldBillType.remove();}
	for (v in result[t].type)
	{
			TheBillType =  ds.BillType.createEntity();
			TheBillType.type=result[t].type[v];
			TheBillType.bill_type=TheBill;
			TheBillType.save();
	}
	//remove the related BillSubject first
	TheOldBillSubject = ds.BillSubject.query('bill.id= :1', result[t].id)	
	if (TheOldBillSubject){TheOldBillSubject.remove();}	
	for (v in result[t].subjects)
	{
			TheBillSubject =  ds.BillSubject.createEntity();
			TheBillSubject.subject=result[t].subjects[v];
			TheBillSubject.bill=TheBill;
			TheBillSubject.save();
	}
}
		
}	
	catch(e) {
	console.log(e);
	}	
}


function TestData(arg){
	
	try {
	switch(arg)
	{
	case 'StateMetaData':
		for (var key in STATE_LIST){
		state =key;
		v="http://openstates.org/api/v1/metadata/" + state + "/?apikey=";
		w= v + require('openstates.api_key').openstates_api_key();
		SaveStateMeta(w);
		}	
		break;
	case 'Bill':
		v="http://openstates.org/api/v1/bills/?state=tx&search_window=session:821&chamber=upper";
		w= v + "&apikey=" + require('openstates.api_key').openstates_api_key()
		SaveBill(w);
		v="http://openstates.org/api/v1/bills/?state=tx&search_window=session:821&chamber=lower";
		w= v + "&apikey=" + require('openstates.api_key').openstates_api_key()
		SaveBill(w);
		break;
	case 'IndividualBill':
		var apikey= require('openstates.api_key').openstates_api_key();
		var TheBills = ds.Bill.query('state= :1', 'tx');
		for (var x=0; x < TheBills.length; x++)
		{
			v="http://openstates.org/api/v1/bills/tx/821/" + TheBills[x].bill_id + "/";
			w= v + "?apikey=" + apikey
			SaveIndividualBill(w);
		}
		break;	
	case 'Legislator':
		//v="http://openstates.org/api/v1/legislators/?state=tx&active=true&chamber=upper";
		v="http://openstates.org/api/v1/legislators/?state=tx&chamber=upper";
		w= v + "&apikey=" + require('openstates.api_key').openstates_api_key();
		SaveLegislator(w);
		//v="http://openstates.org/api/v1/legislators/?state=tx&active=true&chamber=lower";
		v="http://openstates.org/api/v1/legislators/?state=tx&chamber=lower";
		w= v + "&apikey=" + require('openstates.api_key').openstates_api_key();
		SaveLegislator(w);
		break;
	case 'Committee':
		v="http://openstates.org/api/v1/committees/MDC000065/?apikey=";
		w= v + require('openstates.api_key').openstates_api_key();
		SaveCommittee(w);
		break;
	case 'Event':
		v="http://openstates.org/api/v1/events/?state=tx&type=committee:meeting&apikey=";
		w= v + require('openstates.api_key').openstates_api_key();
		SaveEvent(w);
		break;
	case 'District':
		v="http://openstates.org/api/v1/districts/nc/upper/?apikey=";
		w= v + require('openstates.api_key').openstates_api_key();
		SaveDistrict(w);
		break;
	case 'VoteRecord':
		var rv=['SB 7', 'SB 6', 'HCR 5', 'SB 4', 'HB 26', 'SB 2', 'SB 1', 'HB 13', 'HCR 25', 
		'SCR 5', 'HB 79', 'HB 18', 'SB 8', 'HR 232', 'HR 198', 'HR 199', 'HR 197', 'HB 5', 'HB 3', 'HR 218']
		for (t in rv) {
		w='http://bezel.umeme.us:7770/texas?bill=' + rv[t];
		SaveVoteRecord(w);
		}
		break;
	case 'ParseGeneral':
		//w='http://quixie.net/g-v5.txt';
		w='http://thomas.umeme.us/g-v6.txt';
		SaveParseGeneral(w);
		break;	
		
	case 'ParseDetail':
	
		var rv=['http://thomas.umeme.us/1-v6.txt', 'http://thomas.umeme.us/2-v6.txt', 
		'http://thomas.umeme.us/2c-v6.txt', 'http://thomas.umeme.us/3-v6.txt', 'http://thomas.umeme.us/4-v6.txt',
		'http://thomas.umeme.us/5-v6.txt', 'http://thomas.umeme.us/6-v6.txt', 'http://thomas.umeme.us/7-v6.txt',
		'http://thomas.umeme.us/8-v6.txt', 'http://thomas.umeme.us/9-v6.txt', 
		'http://thomas.umeme.us/10-v6.txt', 'http://thomas.umeme.us/11-v6.txt',
		'http://thomas.umeme.us/12-v6.txt', 'http://thomas.umeme.us/13-v6.txt', 
		'http://thomas.umeme.us/14-v6.txt', 'http://thomas.umeme.us/15-v6.txt', 
		'http://thomas.umeme.us/16-v6.txt', 'http://thomas.umeme.us/17-v6.txt'];
		
           
        for (t in rv) {
        v=parseInt(t);
        console.log(rv[v]);
        SaveParse(rv[v]);	
        	};
        break;	
	
	default:
		return;
	}
}
catch (error) {
	console.log(error);
	}	
}

function TemporaryFixer() {
	try {
	TheSession=ds.LegislativeSession.find('identifier=1');
	TheLegislativeEvents=ds.LegislativeEvent.all();		
	for (var i=0;i < TheLegislativeEvents.length; i++) {
		TLEvent=TheLegislativeEvents[i];
		if (TLEvent.legislativeSession == null) {
			TLEvent.legislativeSession=TheSession;
			TLEvent.save();
		}
	}
} catch (e) {
	console.log(e)
}	
}

//ClearOpenStateData('StateMetaData');
//TestData('StateMetaData');

//ClearOpenStateData('Legislator');
//TestData('Legislator');

//ClearOpenStateData('Bill');
//TestData('Bill');

//ClearOpenStateData('District');
//TestData('District');


//not available
//ClearOpenStateData('Committee');
//TestData('Committee');

//ClearOpenStateData('Event');
//TestData('Event');

//ClearOpenStateData('IndividualBill');
//TestData('IndividualBill')

//ClearOpenStateData('VoteRecord');
//TestData('VoteRecord');

//ClearOpenStateData('ParseGeneral');
//TestData('ParseGeneral');
//TestData('ParseDetail');
//TemporaryFixer()

//console.log('done!!');


