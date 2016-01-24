angular.module('starter.filters', [])

.filter('http2https', function() {
  return function(input) {
  	if(input)
  		return input.replace('http', 'https')
  	else
  		return input
    
  };
});