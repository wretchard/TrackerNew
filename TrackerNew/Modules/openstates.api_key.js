
exports.openstates_api_key = function() {return 'a7b283f866e94ff0a572ec269c76a32e'};

exports.readJson = function RetrieveData(URLJson) {
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