'use strict'
var promiseCount = 0;

function testPromise(){
	console.log("Testing promise");

	var thisPromiseCount = ++promiseCount;

	var log = document.getElementById("log");
	log.insertAdjucentHTML("beforeend", thisPromiseCount + ') Started (<small>Sync Code started</small>)');
}