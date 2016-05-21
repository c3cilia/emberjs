(function(){
	var test;
	document.getElementById('search').addEventListener('click', function(){
		test = getMdnAPIData('test', 'test');
	});
	console.log(test);
})();

function getMdnAPIData(url, args){
	var formData = new FormData(document.getElementById('MdnSearchForm'));
	//var promise = new Promise(function(resolve, reject){
		//console.log(formData);
		//var client = new XMLHttpRequest();
	//});
	return "nice";
	//document.getElementById('results').insertAdjacentHTML('beforeend', 'This is where the MDN end point data should be');
}