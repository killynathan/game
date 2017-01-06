var gameControllers = angular.module('gameControllers', []);

gameControllers.controller('MainCtrl', ['$scope', 'auth', '$http', '$state', function($scope, auth, $http, $state) {
	if (!auth.isLoggedIn()) {
		$state.go('login');
	}
	$scope.isLoggedIn = auth.isLoggedIn();
	auth.getUser();
	$scope.user = auth.user;

	$scope.eventStatus = "placeholder";

	$scope.fight = function(map) {
		$scope.user.level++;
		$scope.user.energy = 100;
		$scope.user.combatstats.hp = 100;
		$scope.eventStatus = generateEvent(map, $scope.user);
		$http.put('/users', $scope.user);
	};

	$scope.heal = function(amount) {

	}

	$scope.expToLevel = function() {
		return Math.floor(0.5 * Math.sqrt($scope.user.exp));
	};

	
}]);

gameControllers.controller('AuthCtrl', ['$scope', 'auth', '$state', '$http', function($scope, auth, $state, $http) {
	$scope.user = {};

	$scope.register = function() {
		auth.register($scope.user).then(function successCallback(response) {
			console.log("yay");
			$state.go('home');
		}, function errorCallback(response) {
			console.log("failll");
		});
		$state.go('home');
		/*	
		$http.post('/users', $scope.user).error(function(error) {
			console.log("fail");
			$scope.error = error;
		}).then(function(data) {
			console.log("yay");
		});
		*/
	};

	$scope.login = function() {
		auth.login($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			$state.go('game.profile');
		});

		//$state.go('game.profile');
	}
}]);

gameControllers.controller('TopCtrl', ['$scope', 'auth', function($scope, auth) {
	$scope.isLoggedIn = auth.isLoggedIn();
	$scope.logout = function() {
		auth.logout();
	};
}]);