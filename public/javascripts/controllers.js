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
		$scope.user.energy -= 1;
		$scope.eventStatus = generateEvent(map, $scope.user);
		$scope.user.combatstats.hp = 100;
		//$scope.user.energy = 100;
		$http.put('/users', $scope.user);
	};

	$scope.heal = function(amount) {

	}

	$scope.expToLevel = function() {
		return Math.floor(0.5 * Math.sqrt($scope.user.exp));
	};

	$scope.getEnergyBarLength = function() {
		return $scope.user.energy / 100 * 108;
	}

	$scope.getHpBarLength = function() {
		return $scope.user.combatstats.hp / $scope.user.maxhp * 108;
	}

	$scope.getExpBarLength = function() {
		return (($scope.user.exp - $scope.getExpForCurrentLevel()) / ($scope.getExpForNextLevel() - $scope.getExpForCurrentLevel())) * 108;
	}

	$scope.getExpForNextLevel = function() {
		return Math.pow((($scope.expToLevel() + 1) * 2), 2);
	}

	$scope.getExpForCurrentLevel = function() {
		return Math.pow(($scope.expToLevel() * 2), 2);
	}
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
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.logout = function() {
		auth.logout();
	};
}]);