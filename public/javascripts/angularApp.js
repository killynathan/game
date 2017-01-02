var app = angular.module('game', ['ui.router']);

app.factory('auth', ['$http', function($http) {
	var auth = {
		user: {}
	};

	auth.register = function(user) {
		return $http.post('/users', user).success(function(data) {

		});
	};

	return auth;
}]);

app.controller('MainCtrl', ['$scope', function($scope) {
	$scope.test = "nate";
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
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: '../partials/login.html',
		controller: 'MainCtrl'
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
	.state('home.one', {
		url: '/one',
		templateUrl: '../partials/home.one.html'
	});

	$urlRouterProvider.otherwise('login');
}]);