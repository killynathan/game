var app = angular.module('game', ['ui.router']);

app.factory('auth', ['$http', function($http) {
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
		});
	};

	return auth;
}]);

app.controller('MainCtrl', ['$scope', 'auth', function($scope, auth) {
	$scope.test = "nate";
	$scope.user = auth.user;
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
		templateUrl: '../partials/game.profile.html',
		controller: 'MainCtrl'
	});

	$urlRouterProvider.otherwise('login');
}]);