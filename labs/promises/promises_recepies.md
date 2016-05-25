#### Recipe 1: WORKING WITH PROMISES </br>
Step 1: Create Index.html 
* Create HTML tag ```<html>```
	* Create Head Tag ```<head>```
		* Create a script tag that link promise.js ```<script src="promise.js"></script>```
		* Create a script tag that link jquery ```<script src="jquery.js"></script>```
		* Create a body tag ```<body>```
		* Create a button tag with with following attributes
			```
			onclick="testPromise()"
			```
		* Create a div ```<div>```
			* Create a Span tag with the following attributes ```
				id="log"
				```


Step 2: Create promise.js
* Start the script with [(use strict)](http://www.w3schools.com/js/js_strict.asp) ```'use strict'``` 
* Declare a promise count variable ```var promiseCount = 0```
* Declare the testPromise function ```function testPromise(){```
	* declare a variable called ```thisPromiseCount``` that stores ```promiseCount + 1```
					```var thisPromiseCount = ++promiseCount;```
	* Get the element with id of log ```var log = document.getElementById("log");```
	* log the start of the synchronous code by injecting this html into it using [.insertAdjucentHtml()](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) ```log.insertAdjacentHTML("beforeend", thisPromiseCount + ') Started (<small>Sync Code started</small>)');```
	* Create a new promise ```var p1 = new Promise(```
		* Create a fuction that takes a resolve and reject functions as arguments ```function(resolve, reject){```
			* log the begining of the promise i.e the asyc code ```log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Promise started (<small>Asyn code started</small>)</br>');```
				* Then create a create a timer that executes the promise after a given random time runs out ```window.setTimeout(
						function(){
							resolve(thisPromiseCount);
						}, Math.random() * 2000 + 1000); ```
	* when the promise is executed and has finished then log the fulfilment of the promise 
					```p1.then(
					function(val){
					log.insertAdjacentHTML('beforeend', val + ') Promise Fulfilled (<small>Async code terminated</small>)</br>');
					}```
	* If something goes wrong and the promise is not exexuted then log the reason
					```).catch(
					function(reason){
				console.log('Handle rejected promise ('+reason+') here.')
				}
			);```
	* then log the finished synchronous code 
			log.insertAdjacentHTML('beforeend', thisPromiseCount+ ') Promise made (<small>Sync code terminated</small>)</br>');


#### Recipe 2: WORKING WITH PROMISES USING AN AJAX CALL 
######Step 1: Create index.html
* Create html tags ```<html>```
	* Create the head tags ```<head>```
		* Create script tags to get CORS1.js ```<script src="recepe2.js">```
		* Create script tags to get jquery.js ```<script src="jquery.js">```
	* Create the body tags ```<body>```
		* Create a button that calls startCall() function when clicked ```<button onclick="startCall()"> ```
		* Create a div with the id of output ```<div id="output">``` 

######Step 2: Create recipe2.js
* Create the function startCall() ```function startCall(){```
	* Create a variable MdnApi and call an API endpoint ```var MdnAPI = 'http://localhost/emberjs/CORS/backend_api.php/'```
	* Call a function GetMdnAPIData()  ```getMdnAPIData(MdnAPI);```
* Create a function getMdnAPIData(uri){ ```function getMdnAPIData(uri){```
	* Create an xhr varible ```var client = new XMLHttpRequest();```
	* Create a promise ```var promise = new Promise(function (resolve, reject){```
		* Open a request to the endpoint ```client.open('GET', uri, true);```
		* Send the request ```client.send();```
		* Onload of the response ```client.onload = function (){```
			* If the status code is between 200 and 300 ```if (this.status >= 200 && this.status <= 300){```
				* resolve the response ```resolve(this.reponse);```
			* else 
				* reject the response with the status text ```reject(this.statusText);```
		* On error ```client.error = function(){```
			* reject the response with the status text ```reject(this.statusText);```

	* Then wait for promise ```promise.then(function(){```
		* get the element with the id output ```var log = document.getElementById('output');```
		* Displau the output of the request in the html document ```log.insertAdjacentHTML('beforeend', client.responseText);```  


######Step 2: Create backend_api.js (endpoint)
* Start the php tags ```<?php```
	* Store the MDN endpoint url in a variable ```$url = 'https://developer.mozilla.org/en-US/search.json/';```
	* get the content of the endpoint ```$json_content = file_get_contents($url);```
	* then dump the content in the page ```exit($json_content); ```

