	include ('Modules/Parseload.js');
	
	function addJson(session, state, type, data) {
		try {
			TheStateMetaData=ds.StateMetadata.find('name=:1', state)
			if (TheStateMetaData) {
			for (d in data) {
				var vfileName =data[d];
				if (vfileName) {
					TheLegislativeSource=ds.LegislativeSource.createEntity();
					TheLegislativeSource.session=session;
					TheLegislativeSource.sessiontype=type;
					TheLegislativeSource.state=TheStateMetaData;
					TheLegislativeSource.url=vfileName;
					var start= vfileName.indexOf('us/') +3;
					var finish = vfileName.indexOf('-')
					var TheDay = vfileName.slice(start, finish)
					if (TheDay) {TheLegislativeSource.day=TheDay}	
					TheLegislativeSource.save();
					
				}
			}
			}
			else {
				throw new Error('No State');
			}
		} 
		
		catch (e) {
			
			console.log(e.message);

		}

	
	}

function removeJson(session, state, type) {
	try {
		
		TheLegislativeSource=ds.LegislativeSource.query('session=:1 and state.name=:2 and type=:3', 
		session, state, type);
		if (TheLegislativeSource) {
			TheLegislativeSource.remove();
			return true;
			
		}
		else {
			return false;
		}
	} 
	
	catch (e) {
		console.log(e);
	}

}

		var p82cd =['http://thomas.umeme.us/1-v6.txt', 'http://thomas.umeme.us/2-v6.txt', 
		'http://thomas.umeme.us/2c-v6.txt', 'http://thomas.umeme.us/3-v6.txt', 'http://thomas.umeme.us/4-v6.txt',
		'http://thomas.umeme.us/5-v6.txt', 'http://thomas.umeme.us/6-v6.txt', 'http://thomas.umeme.us/7-v6.txt',
		'http://thomas.umeme.us/8-v6.txt', 'http://thomas.umeme.us/9-v6.txt', 
		'http://thomas.umeme.us/10-v6.txt', 'http://thomas.umeme.us/11-v6.txt',
		'http://thomas.umeme.us/12-v6.txt', 'http://thomas.umeme.us/13-v6.txt', 
		'http://thomas.umeme.us/14-v6.txt', 'http://thomas.umeme.us/15-v6.txt', 
		'http://thomas.umeme.us/16-v6.txt', 'http://thomas.umeme.us/17-v6.txt'];
		
		var p82cg =['http://thomas.umeme.us/g-v6.txt'];
		
		//removeJson('82', 'tx', 'general')
		
		//addJson('82', 'tx', 'detail', p82cd)
		//addJson('82', 'tx', 'general', p82cg)
		
		