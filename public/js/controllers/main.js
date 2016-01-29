angular.module('cardController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Cards', function($scope, $http, Cards) {
		$scope.formData = {};
		$scope.loading = false;
		$scope.cards = [];

		$scope.findCards = function() {
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				Cards.searchForCard($scope.formData.text)
					.success(function(data) {
						$scope.loading = false;
						//$scope.formData = {}
						$scope.cards = [];
						for(var key in data) {
							$scope.cards.push(data[key]);
						};
					});
			}
		};

	}]);