var app = angular.module('game', ['ui.router']);

app.factory('auth', ['$http', '$window', function($http, $window) {
	var auth = {
		user: {}
	};

	auth.register = function(user) {
		return $http.post('/users', user).success(function(data) {

		});
	};

	auth.login = function(user) {
		return $http.post('/login', user).success(function(data) {
			angular.copy(data, auth.user);
			$window.sessionStorage.setItem("user", JSON.stringify(auth.user));
		});
	};

	auth.logout = function() {
		$window.sessionStorage.removeItem("user");
	};

	auth.isLoggedIn = function() {
		var user = $window.sessionStorage.getItem("user");
		if (user) return true;
		else return false;
	};

	auth.getUser = function() {
		if (auth.isLoggedIn()) {
			var userString = $window.sessionStorage.getItem("user");
			var user = JSON.parse(userString);
			$http.get('/users/' + user._id).success(function(data) {
				angular.copy(data, auth.user);
			});
		}
	};

	return auth;
}]);

app.factory('userChar', ['http', function($http) {
	var userChar = {};

	userChar.updateUser = function(user) {
		return $http.put('/users', user);
	};

	return userChar;
}]);

app.controller('MainCtrl', ['$scope', 'auth', '$http', '$state', function($scope, auth, $http, $state) {
	if (!auth.isLoggedIn()) {
		$state.go('login');
	}
	auth.getUser();
	$scope.user = auth.user;
	$scope.isLoggedIn = auth.isLoggedIn();

	$scope.fight = function() {
		$scope.user.level++;
		$scope.user.energy -= 10;
		$http.put('/users', $scope.user);
	};
}]);

app.controller('AuthCtrl', ['$scope', 'auth', '$state', '$http', function($scope, auth, $state, $http) {
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
		auth.login($scope.user);
		$state.go('game.profile');
	}
}]);

app.controller('TopCtrl', ['$scope', 'auth', function($scope, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.logout = function() {
		auth.logout();
	};
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: '../partials/login.html',
		controller: 'AuthCtrl'
	})
	.state('register', {
		url: '/register',
		templateUrl: '../partials/register.html',
		controller: 'AuthCtrl'
	})
	.state('home', {
		url: '/home',
		templateUrl: '../partials/home.html',
		controller: 'MainCtrl'
	})
	.state('game', {
		url: '/game',
		templateUrl: '../partials/game.html',
		controller: 'MainCtrl'
	}).
	state('game.profile', {
		url: '/profile',
		templateUrl: '../partials/profile.html',
		controller: 'MainCtrl'
	}).
	state('game.map', {
		url: '/map',
		templateUrl: '../partials/map/map.main.html',
		controller: 'MainCtrl'
	})
	.state('game.lithharbor', {
		url: '/lithharbor',
		templateUrl: '../partials/map/map.lithharbor.html',
		controller: 'MainCtrl'
	}).
	state('game.beach', {
		url: '/beach',
		templateUrl: '../partials/map/map.beach.html',
		controller: 'MainCtrl'
	});

	$urlRouterProvider.otherwise('login');
}]);