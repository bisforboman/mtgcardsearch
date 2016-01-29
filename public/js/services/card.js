angular.module('cardService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Cards', ['$http',function($http) {
		return {
			get : function(cardId) {
				return $http.get('/api/card/:cardId');
			},
			searchForCard : function(searchStr) {
				return $http.get('/api/cards/' + searchStr);
			}
		}
	}]);