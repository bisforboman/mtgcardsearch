angular.module('cardController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Cards',function($scope, $http, Cards, colorFilter) {
		$scope.formData = {};
		$scope.loading = false;
		$scope.showMultipleCards = true;
		$scope.cards = [];
		$scope.singleCard = {};
		$scope.cardOptions = {
			colors: [
				{ name: 'Red',    		selected: true	},
				{ name: 'Green',   		selected: true	},
				{ name: 'Blue',			selected: true	},
				{ name: 'White', 		selected: true	},
				{ name: 'Black',		selected: true	},
				{ name: 'Colorless',	selected: true	}
			],
			colorsForce: 'false',
			target: 'name'
		};

		/* -------- COLOR CHOICES ------------------ */

		// selected and not selected colors.
		$scope.selection = [];
		$scope.unSelection = [];

		// helper method to get selected colors
		$scope.selectedColors = function selectedColors() {
			return colorFilter($scope.cardOptions.colors, { selected: true });
		};

		// helper method to get the colors not selected
		$scope.notSelectedColors = function notSelectedColors() {
			return colorFilter($scope.cardOptions.colors, { selected: false });
		};

		// watch cardOptions.colors for changes
		$scope.$watch('cardOptions.colors | filter:{selected:true}', function (nv) {
			$scope.selection = nv.map(function (color) {
				return color.name;
			});
		}, true);

		// watch cardOptions.colors for changes
		$scope.$watch('cardOptions.colors | filter:{selected:false}', function (nv) {
			$scope.unSelection = nv.map(function (color) {
				return color.name;
			});
		}, true);

		/* Call this function to search for cards matching the parameters. */
		$scope.findCards = function() {
			if ($scope.formData.text != undefined) {
				$scope.showMultipleCards = true;
				$scope.loading = true;
				var config_json = {
					colors: $scope.selection,
					noColors: $scope.unSelection,
					colorsForce: $scope.cardOptions.colorsForce,
					target: $scope.cardOptions.target
				};

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

		/* function for finding just one card. Should be used for clicking cards. */
		$scope.findACard = function(multiverseid) {
			Cards.searchCard(multiverseid)
				.success(function(data) {
					$scope.loading = false;
					$scope.previewOne(data[0]);
				})
				.error(function(err) {
					console.log("Error occured.");
					console.error(err);
				});

		};

		/* Switches display areas to previewing just one card. */
		$scope.previewOne = function(card) {
			// hide multiview, showing singleview
			$scope.showMultipleCards = false;
			$scope.singleCard = card;
		};

	}]);