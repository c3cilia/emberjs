(function(){
	//document.getElementById('search').onclick = function (){
		var MdnAPI = 'https://developer.mozilla.org/en-US/search.json';
		getMdnAPIData(MdnAPI);
	//};
})();

function getMdnAPIData(uri){
	var client = new XMLHttpRequest();

	if ('withCredentials' in client){
		client.open('GET', uri, true);
		//client.withCredentials = true;	
	}
	client.send();

	client.onload = function(){
		var resp = client.responseText;
		resp.addHeader("Access-Control-Allow-Origin", "http://localhost/emberjs/CORS/");
		console.log(resp);
	};
	client.error = function(){
		console.log("There was an error	");
	}
}