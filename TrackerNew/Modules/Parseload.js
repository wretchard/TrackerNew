var LegislativeEventAttributes = [ "type", "what", "description", "identifier", "who", "links", "url", "when", "record_number"];


function FindType(result, result_type) {
    "use strict";
	try {
	    switch (result_type) {
	    case 'general':
		for (var t in result) {
		switch(result[t].type)
		{
			case 'session':
			addLegislativeSession(result[t])		
			break;
					
			case 'proposed':
			switch(result[t].what)
			{
			
				case 'bill':
				addLegislativeBill(result[t]);
				break;
				
				case 'resolution':
				addLegislativeResolution(result[t]);
				break;
							
				default:
				console.log('29 unhandled ' + result[t].what);
				break;
				
			};
			break;
			
			default:
			console.log('36 unhandled ' + result[t].type);
			break;	
		};
	}
		return;
		break;
	//this handles legislative events
	case 'detail':
	for (var t in result) {
		 handleGenericEvent(result[t], result[t].what);
	}
		return;
		break;
	default:
		return;
	}
}
catch(e){
		console.log('find type error');
		console.log(e);
	}
}

function addLegislativeSession(result) {
try {
	TheLegislativeSession=ds.LegislativeSession.find('identifier=:1', result.identifier);
	if(TheLegislativeSession == null) {
		TheLegislativeSession= ds.LegislativeSession.createEntity();
		}
		//scalars
		(result.type !== null) ? TheLegislativeSession.type=result.type : TheLegislativeSession.type=null;
		(result.what !== null) ? TheLegislativeSession.what=result.what : TheLegislativeSession.what=null;
		(result.identifier !== null) ? TheLegislativeSession.identifier=result.identifier : TheLegislativeSession.identifier=null;
		(result.session_number !== null) ? TheLegislativeSession.session_number=result.session_number : TheLegislativeSession.session_number=null;
		(result.description !== null) ? TheLegislativeSession.description=result.description.join(' ') : TheLegislativeSession.description=null;
		(result.session_continuation !== null) ? TheLegislativeSession.session_continuation=result.session_continuation : TheLegislativeSession.session_continuation=null;
		//link tables
		TheLegislativeSession.save();
		if (result.where !== null) {
				addLegislativeChamber(result.where, TheLegislativeSession)
			};
		if (result.who !== null) 	{
			addLegislativeSessionOfficial(result.who, TheLegislativeSession)
			};
		if (result.links !== null) 
		{
			addLegislativeSessionEventLinks(result.links, TheLegislativeSession)
			};		
		TheLegislativeSession.save();
	//add event if not existing		
	TheLegislativeEvent=createLegislativeEventIfNotExisting(result.identifier);
	TheLegislativeEvent.identifier=result.identifier;
	TheLegislativeEvent.description=TheLegislativeSession.description;
	TheLegislativeEvent.type=TheLegislativeSession.type;
	TheLegislativeEvent.what=TheLegislativeSession.what;
	TheLegislativeEvent.save();		
	
	return;
	}
	catch (e) {
		console.log(e);
	}	
}

function addLegislativeSessionEventLinks(links, parentEvent) {
	try {
		//this is where the bug is;
		for (var key in links) {
			varName=key;
			varValue = links[key];
			if (typeof(varValue) == 'object') {
				for (var ky in varValue) {
					varX=varValue[ky];
					if('identifier' in varX) {
					handleGenericEvent(varX, varName, parentEvent);
				}
			else if (varName='proposed_map') { 
				TheLegislativeSessionMap=ds.LegislativeSessionMap.find('legislative_session.ID=:1 and identifier=:2', parentEvent.ID, varX[1]);
					if (!TheLegislativeSessionMap) {
						TheLegislativeSessionMap=ds.LegislativeSessionMap.createEntity();
						};
					TheLegislativeSessionMap.bill_name=varX[0];
					TheLegislativeSessionMap.identifier=varX[1];
					DE=ds.LegislativeSession.find('ID=:1', parentEvent.ID);
					TheLegislativeSessionMap.legislative_session=DE
					TheLegislativeSessionMap.save();
					}
			else if (varName='meetings') {
				console.log('handle ' + varName)
			}
			else if (varName='X_ceremonies') {
				console.log('handle ' + varName)
			}
			else if (varName='X_attendances') {
				console.log('handle ' + varName)
			}
			else if (varName='X_Messages') {
				console.log('handle ' + varName)
			}
			else {
				console.log('unknown case');
			}
				}
			
			}
			}
			return;
	
} catch (e) {
	console.log(e);
}

	
}

function addLegislativeResolution(result) {
	try {
		//something
		TheLegislativeEvent=ds.LegislativeEvent.find('identifier=:1', result.identifier);
		if(!TheLegislativeEvent) {
			TheLegislativeEvent=ds.LegislativeEvent.createEntity();
		}
		// add the scalars
		TheLegislativeEvent.type=result.type;
		TheLegislativeEvent.what=result.what;
		TheLegislativeEvent.identifier=result.identifier;
		if (result.description !== null) {
			TheLegislativeEvent.description=result.description.join(' ') 
		}
		//links
	if (typeof(result.links)==='object') {
		if (result.links['session']) {
			varSession=result.links['session'];
			TheSession=ds.LegislativeSession.find('identifier=:1', varSession)
		}
		for (var key in result.links) {
			varName=key;
			varValue=result.links[key];
			TheLegislativeLink=ds.LegislativeLink.find('identifier=:1 and link_name=:2', varValue, varName);
			if(!TheLegislativeLink) {
				TheLegislativeLink=ds.LegislativeLink.createEntity();
			}
			TheLegislativeLink.identifier=varValue;
			TheLegislativeLink.name=result.what;
			TheLegislativeLink.link_name=varName;
			if (TheSession) {
				TheLegislativeLink.session=TheSession;
			}
			TheLegislativeLink.save();
		}
	}
	TheLegislativeEvent.save()		
	if (typeof(result.who)==='object') {
		for (var key in result.who) {
			varName=key;
			varValue=result.who[key];
		if (typeof(varValue)=='string') {
			createLegislativeEventWhoString(varName, varValue, TheLegislativeEvent);
		}
		else {
			createLegislativeEventWho(varName, varValue, TheLegislativeEvent);
		}
		}	
	} 
}

catch (e) {
	console.log(e);
}

}


function addLegislativeBill(result) {
	//create a legislative event if doesn't exist yet
	TheLE=createLegislativeEventIfNotExisting(result.identifier);
	TheLE.identifier=result.identifier;
	TheLE.description=result.description.join(' ');
	TheLE.type=result.type;
	TheLE.what=result.what;
	TheLE.save();	

	TheLegislativeBill=ds.LegislativeBill.find('identifier=:1', result.identifier);
	if(TheLegislativeBill == null) {
		TheLegislativeBill= ds.LegislativeBill.createEntity();
		}
		
		(result.type !== null) ? TheLegislativeBill.type=result.type : TheLegislativeBill.type=null;
		(result.what !== null) ? TheLegislativeBill.what=result.what : TheLegislativeBill.what=null;
		(result.identifier !== null) ? TheLegislativeBill.identifier=result.identifier : TheLegislativeBill.identifier=null;
		(result.proposed_name !== null) ? TheLegislativeBill.proposed_name=result.proposed_name : TheLegislativeBill.proposed_name=null;
		(result.proposed_title !== null) ? TheLegislativeBill.proposed_title=result.proposed_title : TheLegislativeBill.proposed_title=null;
		(result.description !== null) ? TheLegislativeBill.description=result.description.join(' ') : TheLegislativeBill.description=null;
		//create the links
		if (result.links) {
			if ('session' in result.links) {
				TSession=result.links['session'];
				TheSession=ds.LegislativeSession.find('identifier=:1', TSession)
			}
		for (var key in result.links) {
			varName=key;
			varValue=result.links[key];

			TheLegislativeLink=ds.LegislativeLink.find('identifier=:1 and link_name=:2 and linked_events_identifier=:3', varValue, varName, TheLE.identifier);
			if(!TheLegislativeLink) {
				TheLegislativeLink=ds.LegislativeLink.createEntity();
			}
			TheLegislativeLink.identifier=varValue;
			TheLegislativeLink.name=result.what;
			TheLegislativeLink.link_name=varName;
			TheLegislativeLink.linked_events=TheLE;
			if (TheSession) {
				TheLegislativeLink.session=TheSession;
			}
			TheLegislativeLink.save();
			//create the LegislativeEvent
			TheLegislativeEvent=createLegislativeEventIfNotExisting(varValue);
			TheLegislativeEvent.identifier=varValue;
			TheLegislativeEvent.description=varName;
			TheLegislativeEvent.type='links';
			TheLegislativeEvent.what=result.proposed_name;
			TheLegislativeEvent.save();
			}
		}
		if (result.who) {
			varWho=0;
			for (var key in result.who) {
				varName=key;
				varValue=result.who[key];
				if(varValue.constructor !== Array)
				{
					createLegislativeEventWhoString(varName, varValue, TheLE)
					continue;
				}
				else {
				for (var i=0; i<varValue.length; i++) {
					createLegislativeEventWho(varName, varValue, TheLE)
				}
			}
			}
			
		}
		TheLegislativeBill.save();	


}

function createLegislativeEventIfNotExisting(identifier) {
	try {
		TheLegislativeEvent=ds.LegislativeEvent.find('identifier=:1', identifier);
		if (!TheLegislativeEvent) {
			TheLegislativeEvent=ds.LegislativeEvent.createEntity();
			}
		return TheLegislativeEvent;
	
} catch (e) {

}

	
}


function addLegislativeChamber(where, TheSession) {
	try {
	TheLegislativeChamber=ds.LegislativeChamber.find('state=:1 and house=:2', where.state, where.house);
	if(TheLegislativeChamber == null) {
		TheLegislativeChamber= ds.LegislativeChamber.createEntity();
		}
		
		(where.city !== null) ? TheLegislativeChamber.city=where.city : TheLegislativeBill.city=null;
		(where.state !== null) ? TheLegislativeChamber.state=where.state : TheLegislativeBill.state=null;
		(where.house !== null) ? TheLegislativeChamber.house=where.house : TheLegislativeBill.house=null;
		if (TheLegislativeChamber.state !== null) {
			TheStateMetadata=ds.StateMetadata.find('open_id=:1', TheLegislativeChamber.state)
			if (TheStateMetadata !== null) {TheLegislativeChamber.state_metadata=TheStateMetadata};
			}
		//add session data
		TheLegislativeChamber.legislative_session=TheSession;
		TheLegislativeChamber.save();
	}
	catch (e) {
		console.log(e);
	}
}


function addLegislativeSessionOfficial(who, parentEvent) {
	if (who ==Object(who)) {
		for(var key in who)
		{
			varValue=who[key];	
			TheLegislativeSessionOfficial=ds.LegislativeSessionOfficial.find('who_name=:1 and title=:2 and legislative_session.ID=:3', varValue, key, parentEvent.ID);
			if(TheLegislativeSessionOfficial == null) {
			TheLegislativeSessionOfficial= ds.LegislativeSessionOfficial.createEntity();
			}
		 TheLegislativeSessionOfficial.who_name=varValue;
		 TheLegislativeSessionOfficial.title=key;
		 TheLegislativeSessionOfficial.legislative_session=parentEvent;
		 TheLegislativeSessionOfficial.save();
		}
		
	};
	
}

function addLegislativeEvent(resultT, keys, optionalargs, parentEvent) {
try {
	TheLegislativeEvent=ds.LegislativeEvent.find('identifier=:1', resultT.identifier);
		if(TheLegislativeEvent == null) {
			TheLegislativeEvent= ds.LegislativeEvent.createEntity();
		}
		for (t in keys) {
		var varName = (keys[t]);
		var varValue= resultT[varName];

		if (typeof(varValue)==='object') {
			//handle array types
			if(varValue.constructor == Array) {

				switch(varName) {
										
					case 'description':
					TheLegislativeEvent[varName]=varValue.join(' ');
					break;
					
					case 'proclamation':
					console.log('365 ' + varName);
					break;
					
					case 'added_signers_to':
					console.log('369 ' + varName);
					break;
					
					case 'X_excuses':
					console.log('373 ' + varName)
					break;

					case 'absent_excused':
					console.log('373 ' + varName)
					break;					
					
					case 'who':
					TheLegislativeEvent.save();
					createVerb(varName, varValue, TheLegislativeEvent);	
					break;
					
					case 'present':
					createVerb(varName, varValue, TheLegislativeEvent);	
					break;
					
					case 'links':
					createVerb(varName, varValue, TheLegislativeEvent);	
					break;
					
					case 'message':
					console.log('385 ' + varName);
					break;
					
					case 'bills':
					console.log('397 ' + varName);
					break;
					
					case 'passed_list':
					console.log ('401 ' + varName);
					break;
					
					case 'reports':
					console.log ('405 ' + varName);
					break;
					
					case 'X_original_text':
					console.log ('409' + varName);
					break;
					
					case 'X_pursuant_to_rules':
					console.log ('413' + varName);
					break;
					
					case 'statement-of-vote-list':
					console.log ('417' + varName);
					break;
					
					case 'postponments':
					console.log ('421 ' + varName);
					break;
					
					case 'legislative_intent':
					console.log ('425 ' + varName);
					break;
					
					case 'reasons-for-vote':
					console.log ('429 ' + varName);
					break;
					
					case 'missing-excuses':
					console.log ('433 ' + varName);
					break;
					
					case 'rule':
					console.log ('436 ' + varName);
					break;
					
					case 'request_conference_list':
					console.log ('441 ' + varName);
					break;
					
					case 'request_conference_list':
					console.log ('445 ' + varName);
					break;
					
					case 'closing_remarks':
					console.log ('449 ' + varName);
					break;
					
					case 'introduction_remarks':
					console.log ('453 ' + varName);
					break;
					
					case 'petition_text':
					console.log ('457 ' + varName);
					break;
					
					case 'remarks':
					console.log ('461 ' + varName);
					break;
					
					case 'concur_list':
					console.log ('465 ' + varName);
					break;
					
					case 'proposals':
					console.log ('469 ' + varName);
					break;
					
					case 'adopted_conference_list':
					console.log ('473 ' + varName);
					break;
					
					case 'granted_conference_list':
					console.log ('476 ' + varName);
					break;
															
					default:
					console.log(varName + ' debugger');
					createVerb(varName, varValue, TheLegislativeEvent);					
				}
			}
			else if(varValue.constructor == Object) {
				
				TheLegislativeEvent.save();
				switch(varName) {
					
					case 'who':
					createLegislativeEventWho(varName, varValue, TheLegislativeEvent)
					break;
					
					case 'links':
					TheLS = createLegislativeLink(varName, varValue, TheLegislativeEvent)
					TheLegislativeEvent.legislativeSession=TheLS;
					break;
					
					case 'when':
					TheLegislativeEvent.when_event.add(createLegislativeEventWhen(varName, varValue, TheLegislativeEvent));
					break;
					
					case 'recorded_vote':
					createLegislativeEventRecordedVote(varName, varValue, TheLegislativeEvent)
					break;
				
					default:
					console.log(varName + ' is unhandled object 396')

				}
			}
			else {console.log(varName + ' is of unknown type')}
		}
		else {
			//scalar 
			//check if the attribute exists; assign the value to an attribute
			if (varName in TheLegislativeEvent) {
				if (optionalargs) {
					TheLegislativeEvent.type=optionalargs;
				}
				if (varValue !==null) {
					TheLegislativeEvent[varName]=varValue;
				}
			}
			else {
				TheLegislativeEvent.type=optionalargs;
				TheLegislativeEvent.save();
				createVerbSession(varName, varValue, TheLegislativeEvent);
			}
		
		}
		//end if typeof
		}
		//end for
		TheLegislativeEvent.save();
		return true;	
	}
catch (e) {
	console.log(e);
}
}

function createVerbSession(varName, varValue, parentEvent, optionalargs) {
  try {
	TheVerb=ds.LegislativeVerb.find('legislativeEvent.identifier=:1 and verb_name=:2', parentEvent.identifier, varName);
	if (!TheVerb) {
		TheVerb=ds.LegislativeVerb.createEntity();
	}
	TheLE=ds.LegislativeEvent.find('identifier =:1', parentEvent.identifier);
	if (TheLE == null) {
		console.log('here 551');
	}
	TheVerb.verb_name=varName;
	TheVerb.legislativeEvent=TheLE;	
	TheVerb.description=varValue;
	TheVerb.save();		
	
} 

catch (e) {

}

	
}


function handleGenericEvent(resultT, what, parentEvent) {
	//the bug is here
	var keys = findKeys(resultT);
	addLegislativeEvent(resultT, keys, what, parentEvent)
	return true;
}


function findKeys(resultT) {
	var keys=[];
	for (var key in resultT) {
   	keys.push(key.toString());
	}
	//console.log(keys);
	return keys;
}

function createLegislativeEventWhoString(varName, varValue, parentEvent) {
	try {
		TheLegislator=ds.Legislator.find('last_name=:1', varValue);
		if (TheLegislator) {
		TheLegislativeWho=ds.LegislativeWho.find('legislative_event.ID=:1 and legislator_who.ID=:2', 
		parentEvent.ID, TheLegislator.ID)			
		
		
		if (!TheLegislativeWho) {
			TheLegislativeWho=ds.LegislativeWho.createEntity();
		}
			TheLegislativeWho.legislative_event=parentEvent;
			TheLegislativeWho.legislator_who=TheLegislator;
			TheLegislativeWho.description=varName;
			TheLegislativeWho.save();			
		}	
		//end if
		else {
			TheLegislativeWho=ds.LegislativeWho.createEntity();
			TheLegislativeWho.legislative_event=parentEvent;
			TheLegislativeWho.legislator_who_unmatched=arrName.join(' ');
			TheLegislativeWho.description=varName;
			TheLegislativeWho.save();
		}
		
	
} catch (e) {

}

	
}


function createLegislativeEventWho(varName, varValue, parentEvent) {
	try {
		TheLE=ds.LegislativeEvent.find('ID=:1', parentEvent.ID);
		for (var key in varValue){
		if (typeof(varValue[key])=='string') {			
		arrName=varValue[key].split(' ');
		}
		else {
			arrName = varValue[key][0];
			arrName=arrName.split(' ');
			arrName.reverse();
		}
		
		if (arrName.length>1) {
		firstName=arrName.slice(0,1).toString()	
		lastName=arrName.slice(-1).toString();
		initial=firstName.slice(0,1)
		TheLegislator= FindLegislator2(lastName, firstName, 'tx');
		}
		else {
		TheLegislator=ds.Legislator.find('last_name=:1', arrName[0]);
		}
		//create the LegislativeWho here
		if(TheLegislator) {
		TheLegislativeWho=ds.LegislativeWho.find('legislative_event.ID=:1 and legislator_who.ID=:2', 
		parentEvent.ID, TheLegislator.ID)
		
		if (!TheLegislativeWho) {
			TheLegislativeWho=ds.LegislativeWho.createEntity();
		}
			TheLegislativeWho.legislative_event=parentEvent;
			TheLegislativeWho.legislator_who=TheLegislator;
			TheLegislativeWho.description=varName;
			TheLegislativeWho.save();			
		}
		//end if
		else {
			TheLegislativeWho=ds.LegislativeWho.createEntity();
			TheLegislativeWho.legislative_event=parentEvent;
			if (typeof(arrName)=='string') {
				TheLegislativeWho.legislator_who_unmatched=arrName
			}
			else {
				TheLegislativeWho.legislator_who_unmatched=arrName.join(' ');
			}
			TheLegislativeWho.description=varName;
			TheLegislativeWho.save();
		}			
		}
		//end for

			
	}
	//end try
	catch (e)  {
		console.log(e);
		return null;
	}
}

	function createLegislativeEventRecordedVote(varName, varValue, parentEvent) {
	try {
	TheLE=ds.LegislativeEvent.find('ID=:1', parentEvent.ID);
	for (key in varValue) {
		TheLegislativeRecordedVote=ds.LegislativeRecordedVote.find('legislative_event.identifier=:1 and description =2:',
		parentEvent.identifier, key);
		if (!TheLegislativeRecordedVote) {
			TheLegislativeRecordedVote=ds.LegislativeRecordedVote.createEntity();
		}
		TheLegislativeRecordedVote.legislative_event=TheLE;
		TheLegislativeRecordedVote.description=key;
		TheLegislativeRecordedVote.value=varValue[key];
		TheLegislativeRecordedVote.save();
	}
	return;
} catch (e) {

}

}


function FindLegislator2(lastName, firstorInit, state) {
	try {
		//see if it is a firstname or initial
		if (firstorInit.length > 2) {

		}
		else {
			firstorInit=firstorInit.slice(0,firstorInit.length-1) + "*";
		}
		
			TheLegislator=ds.Legislator.find('last_name= :1 and first_name=:2 and state=:3', 
			lastName, firstorInit, 'tx')
			return (TheLegislator !==null) ? TheLegislator: null;
	}
	
	catch (error) {
		console.log(error);
		return null;
	}
}



function createLegislativeLink(varName, varValue, parentEvent) {
	try {
		ky=getKeys(varValue);
		strVarName=''
		var session_number;
		for (var i=0; i<ky.length; i++) {
			strVarName=ky[i];
			innerVarValue=varValue[strVarName];
			if (typeof(innerVarValue)==='object') {
				if(innerVarValue.constructor == Array) {
					ky1=getKeys(innerVarValue);
					strV='';
					for (var i=0; i<ky1.length; i++) {
						vLink=innerVarValue[i];
						vIdentifier=vLink.identifier;
						vWhat=vLink.what;
						//bug here;
						//create the link
						TheLink=ds.LegislativeLink.find('identifier=:1 and link_name=:2', vIdentifier, strVarName);
						if(TheLink == null) {
							TheLink=ds.LegislativeLink.createEntity();
						}
						TheLS=ds.LegislativeSession.find('identifier=:1', session_number);;
						TheLink.session=TheLS;
						TheLink.identifier=vIdentifier;
						TheLink.name=strVarName;
						TheLink.link_name=vWhat						
						TheLE=ds.LegislativeEvent.find('identifier=:1', parentEvent.identifier);

						TheLink.linked_events=TheLE;
						TheLink.save();
						return TheLS;
					}
					
				}
				else {
					console.log('some error')
					//session_number=innerVarValue;
				}
			}
			else {
					//console.log('it is a session number')
						TheLink=ds.LegislativeLink.find('name=:1 and session.identifier=:2', strVarName, parentEvent.identifier);
						if(TheLink == null) {
							TheLink=ds.LegislativeLink.createEntity();
						}
						TheLink.name=strVarName;
						TheLink.link_name=strVarName;	
						TheLink.identifier=parentEvent.identifier;
						TheLS=ds.LegislativeSession.find('identifier=:1', innerVarValue);
						TheLE=ds.LegislativeEvent.find('identifier=:1', parentEvent.identifier);
						TheLink.linked_events=TheLE;
						TheLink.session=TheLS;
						TheLink.save();
						return TheLS;
			}
			//end else
		} 
		//end for
	}
	catch (error) {
		console.log(error);
	}
}

function getKeys(obj)
{
  var keys = [];
  for(var i in obj) if (obj.hasOwnProperty(i))
  {
    keys.push(i);
  }
  return keys;
}

function createLegislativeEventWhen(varName, varValue, parentEvent) {
	try {
		for (var t in varValue) {
		TheLegislativeWhen=ds.LegislativeWhen.find('legislative_event.identifier=:1 and when_attribute=:2', parentEvent.identifier, t);
		if (TheLegislativeWhen == null) {
			TheLegislativeWhen=ds.LegislativeWhen.createEntity();
		}			
		TheLegislativeWhen.when_attribute=t;
		TheLegislativeWhen.when_value=varValue[t];
		TheLE=ds.LegislativeEvent.find('identifier=:1', parentEvent.identifier);
		TheLegislativeWhen.legislative_event=TheLE;
		TheLegislativeWhen.save();
		}
		}
	catch (error) 
	{
		console.log(error);
		return null;
	}
}

function createVerb(varName, varValue, parentEvent) {
	
	try {

	TheLE=ds.LegislativeEvent.find('identifier =:1', parentEvent.identifier);
		if (parentEvent.identifier == 'D6DC13028FD26349BF424578FC3CF798') {
			console.log('here 838');
		}
	who_response=isLegislators(varValue);
	
	if (who_response.is_collection) {
		for (var i=0; i< who_response.legislators.length; i++) {
		ALegislator=ds.Legislator.find('ID=:1', who_response.legislators[i].ID);
		//bug here
		TheVerb=ds.LegislativeVerb.find('legislativeEvent.identifier=:1 and verb_name=:2 and legislators.ID=:3', 
		parentEvent.identifier, varName, who_response.legislators[i].ID);
		if (TheVerb==null) {
			TheVerb=ds.LegislativeVerb.createEntity();	
		}
	    TheVerb.verb_name=varName;
	    TheVerb.legislativeEvent=TheLE;	
	    TheVerb.description=ALegislator.full_name;
	    TheVerb.legislators=ALegislator; 
	    TheVerb.save();	
	  };
	}
		TheVerb=ds.LegislativeVerb.find('legislativeEvent.identifier=:1 and verb_name=:2', 
		parentEvent.identifier, 'unmatched'+ '_' + varName); 
		if (TheVerb==null) {
			TheVerb=ds.LegislativeVerb.createEntity();
		}
	    TheVerb.verb_name='unmatched'+ '_' + varName;
	    TheVerb.legislativeEvent=TheLE;	
	    TheVerb.description=who_response.unmatched.join('\n');
	    TheVerb.save();		
	return true;
	}
	catch(e) {
		console.log(e);
		return false;
	}
}

function isLegislators(varValue) {
	try {
	var iscollection=false;
	var the_who={};
	var the_unmatched = [];
	var LegislatorCollection=ds.Legislator.createEntityCollection();
	if (typeof(varValue)==='object') {
			if(varValue.constructor == Array) {
				for (t in varValue) {
					str=varValue[t];
									
					if (typeof(str) == 'string') {
					legName= str.split(',');
					}
					else {
					legName = str.name;
					}
					if (legName.length>1) {
					lastName = legName.slice(0,1).toString();
					firstorInit= legName.slice( -1).toString();
					}
					else {
					lastName = legName.slice(0,1).toString();
					firstorInit= null;
					}

					if (firstorInit !== null) {
						qrystr='last_name=' + lastName
   						qrystr+=" and first_name like " + firstorInit + '*'
   						TheLegislator=ds.Legislator.find(qrystr)
					}
					else {
						TheLegislator=ds.Legislator.find('last_name=:1', lastName)
					} 
					
					if (TheLegislator !==null) { 
					LegislatorCollection.add(TheLegislator)
				    }
				    else {
				    	the_unmatched.push(str);
				    };
				}
				
			}
				the_who['legislators']=LegislatorCollection;
				the_who['unmatched']=the_unmatched;
				(LegislatorCollection !==null) ? the_who['is_collection']=true:the_who['is_collection']=false;
				return the_who;
			}

	}
	//end try
	catch(e) {
		console.log	(e);
		return false;
	}
}