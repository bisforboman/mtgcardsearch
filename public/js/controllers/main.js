angular.module('cardController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Cards',function($scope, $http, Cards, colorFilter) {
		$scope.formData = {};
		$scope.loading = false;
		$scope.cards = [];
		$scope.cardOptions = {
			colors: [
				{ name: 'Red',    	selected: true 	},
				{ name: 'Green',   	selected: false },
				{ name: 'Blue',		selected: true 	},
				{ name: 'White', 	selected: false },
				{ name: 'Black',	selected: true	}
			],
			colorsForce: 'false'
		};

		/* -------- COLOR CHOICES ------------------ */

		// selected and not selected colors.
		$scope.selection = [];
		$scope.unSelection = [];

		// helper method to get selected colors
		$scope.selectedColors = function selectedColors() {
			return colorFilter($scope.cardOptions.colors, { selected: true });
		};

		// watch cardOptions.colors for changes
		$scope.$watch('cardOptions.colors | filter:{selected:true}', function (nv) {
			$scope.selection = nv.map(function (color) {
				return color.name;
			});
		}, true);

		// helper method to get selected fruits
		$scope.notSelectedColors = function notSelectedColors() {
			return colorFilter($scope.cardOptions.colors, { selected: false });
		};

		// watch fruits for changes
		$scope.$watch('cardOptions.colors | filter:{selected:false}', function (nv) {
			$scope.unSelection = nv.map(function (color) {
				return color.name;
			});
		}, true);



		$scope.findCards = function() {
			if ($scope.formData.text != undefined) {
				$scope.loading = true;
				var config_json = {
					colors: $scope.selection,
					noColors: $scope.unSelection,
					colorsForce: $scope.cardOptions.colorsForce,
					target: 'name'
				};

				console.log(config_json);

				Cards.searchForCards($scope.formData.text, config_json)
					.success(function(data) {
						$scope.loading = false;
						//$scope.formData = {}
						$scope.cards = [];
						for(var key in data) {
							$scope.cards.push(data[key]);
						};
					})
					.error(function(err) {
						console.log("Error occured.");
						console.error(err);
					});
			}
		};

	}]);