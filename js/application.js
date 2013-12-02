
$(document).ready(function(){
var lat;
var lon;
var randomPick = function(){
	var zip = $('#zipCode').val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': zip}, function(results, status){
			lat = results[0].geometry.location.ob;
			lon = results[0].geometry.location.pb;
			console.log(lat);
			console.log(results);
		
	});
	console.log(lat);
	var radius = $('#milesAway').val();
	$.getJSON('http://api.citygridmedia.com/content/places/v2/search/latlon?type=restaurant&lat='+lat+'&lon='+lon+'&sort=highestrated&radius='+radius+'&format=json&publisher=10000005460&callback=?', function(json) {
		console.log(json);
		});
	}

$('#main-form').on('click','#submit', function(event){
	event.preventDefault();
	randomPick();
	console.log(lat)
});

	
});