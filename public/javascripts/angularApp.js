var app = angular.module('game', ['ui.router', 'gameControllers', 'gameServices']);

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