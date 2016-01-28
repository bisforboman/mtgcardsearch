angular.module('cardService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Card', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/card');
			},
			create : function(cardData) {
				return $http.post('/api/card', cardData);
			}
		}
	}]);