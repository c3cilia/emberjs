
function startCall(){
	var MdnAPI = 'http://localhost/emberjs/CORS/backend_api.php/';
	getMdnAPIData(MdnAPI);
}

function getMdnAPIData(uri){
	var client = new XMLHttpRequest();
	var promise = new Promise(function (resolve, reject){
		client.open('GET', uri, true);
		client.send();
		
		client.onload = function (){
			if (this.status >= 200 && this.status <= 300){
				resolve(this.reponse);
			}
			else {
				reject(this.statusText);
			}
		};

		client.error = function(){
			reject(this.statusText);
		}	

	});

	promise.then(function(){
		var log = document.getElementById('output');
		log.insertAdjacentHTML('beforeend', client.responseText);
	});	
}