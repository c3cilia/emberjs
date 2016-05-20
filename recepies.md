WORKING WITH PROMISES </br>
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
			* Create a Span tag with the following attributes
				```
				id="log"
				```
</br>Step 2: Create promise.js
	* Start the script with ```'use strict'``` (http://www.w3schools.com/js/js_strict.asp)
	* Declare a promise count variable ```var promiseCount = 0```
	* Declare the testPromise function ```function testPromise(){```
		* declare a variable called thisPromiseCount that store promiseCount + 1
					```var thisPromiseCount = ++promiseCount;```
		* Get the element with id of log ```var log = document.getElementById("log");```
		* log the start of the synchronous code by injecting this html into it using .insertAdjucentHtml() (https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) ```log.insertAdjacentHTML("beforeend", thisPromiseCount + ') Started (<small>Sync Code started</small>)');```
		* Create a new promise var p1 = new Promise(
			* Create a fuction that takes a resolve and reject functions as arguments function(resolve, reject){
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