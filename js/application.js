$(document).ready(function(){


	$.getJSON('http://api.citygridmedia.com/content/places/v2/search/where?what=restaurant&where=44126&format=json&publisher=10000005460?callback=?', function(json) {
		console.log(json);
	});
});