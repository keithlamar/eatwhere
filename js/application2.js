$(document).ready(function(){
  $('#suggestion').hide();
  $('.progress').hide();
  
  //API authorization for Yelp
  var auth = { 
    consumerKey: "UUBRiRbedC04V3GUsLX88w", 
    consumerSecret: "9YHTilmviAOnjmu6gUL3b6nfOhk",
    accessToken: "SL8aXv4yHYTeFdKYrC9L1Gq-uptIyvC7",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "TuxO1003tX30hFnmX_8nNfATqpI",
    serviceProvider: { signatureMethod: "HMAC-SHA1"}
  };

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };
  
function getResults(){
  var radius = $('#milesAway').val() * 1609.34; //converts miles to meters for yelp
  var zip = $('#zipCode').val();
  if(radius == 0){ radius = 2.5 * 1609.34 } //sets radius if left blank
  if(zip == 0){ zip = 77656; radius = 40000; }; //if zip is left blank, will search random
  //parameters for yelp API jsonp call
  parameters = [];
  parameters.push(['term', 'food']);
  parameters.push(['location', zip]);
  parameters.push(['callback', 'cb']);
  parameters.push(['radius_filter', radius]);
  parameters.push(['sort', 2]);
  parameters.push(['limit', 20]);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);
  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

  var message = { 
  'action': 'http://api.yelp.com/v2/search',
  'method': 'GET',
  'parameters': parameters 
  };
  
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
  console.log(parameterMap);

  $.ajax({
    'url': message.action,
    'data': parameterMap,
    'cache': true,
    'dataType': 'jsonp',
    'jsonpCallback': 'cb',
    'success': function(data, textStats, XMLHttpRequest) {
      console.log(data);
      window.choices = data.businesses;

      randomPick();
  }
});
};

  function randomPick(){
      //window.lastChoice; //need way of to not show same listing twice in a row
      
      
     
      var random = choices[Math.floor((Math.random()*20))]; //random select choice
      

      //check if there is an image available
      if(typeof(random.image_url)=="string"){
        var image = random.image_url.replace("ms.jpg", "l.jpg"); //changes yelp img to large
        }
      else{
        var image = "images/no-image.jpg";
        }
      //populate data in HTML
      $('.name').html(random.name);
      $('#pic').attr('src', image);
      $('#rating').attr('src', random.rating_img_url_large);
      $('#votes').html(random.review_count)
      $('#street').html(random.location.display_address[0]);
      $('#city').html(random.location.display_address[1]);
      $('#phone').html(random.display_phone);
      
  }

  

  $('#main-form').on('click','#submit', function(event){
    event.preventDefault();
    $('#form').hide('slide')
    $('#suggestion').fadeOut();
    getResults();
    $('#suggestion').delay(1500).show('drop', 'easeInBounce');
  });

  $('#buttons').on('click', '#next', function(){
    $('#suggestion').fadeOut();
    setTimeout(function(){randomPick()}, 800);
    $('#suggestion').delay(800).show('drop', 'swing', 'down');
  });

  $('#buttons').on('click', '#reset', function(){
    $('#suggestion').fadeOut();
    $('#form').show('slide');
  })
});﻿ //doc ready