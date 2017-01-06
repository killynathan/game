var gameServices = angular.module('gameServices', []);

gameServices.factory('auth', ['$http', '$window', function($http, $window) {
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

gameServices.factory('userChar', ['http', function($http) {
	var userChar = {};

	userChar.updateUser = function(user) {
		return $http.put('/users', user);
	};

	return userChar;
}]);