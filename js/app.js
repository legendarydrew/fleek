// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

/*
https://api.flickr.com/services/feeds/photos_public.gne

id (Optional)
A single user ID. This specifies a user to fetch for.
ids (Optional)
A comma delimited list of user IDs. This specifies a list of users to fetch for.
tags (Optional)
A comma delimited list of tags to filter the feed by.
tagmode (Optional)
Control whether items must have ALL the tags (tagmode=all), or ANY (tagmode=any) of the tags. Default is ALL.
format (Optional)
The format of the feed. See the feeds page for feed format information. Default is Atom 1.0.
lang (Optional)
The display language for the feed. See the feeds page for feed language information. Default is US English (en-us).
*/


// Angular app.
var app         = angular.module('fleek', ['ui.router', 'ngResource']);
var flickr_feed = 'https://api.flickr.com/services/feeds/photos_public.gne';

const VIEW_HOME = 0;

// inspired by http://jsfiddle.net/kstep/j25aj/9/
// We have to use $resource instead of $http.get because of CORS (though this is one way of addressing the issue).
app.factory('flickrPublicPhotos', function ($resource) {
    return $resource('http://api.flickr.com/services/feeds/photos_public.gne',
    	{ format: 'json', jsoncallback: 'JSON_CALLBACK' },
    	{ 'load': { 'method': 'JSONP' }
    });
});

// UI ROUTER configuration.
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        // HOME page.
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.tpl',
			controller: function($scope, flickrPublicPhotos) {
				$scope.model.view = VIEW_HOME;
				$scope.model.data = flickrPublicPhotos.load();
			}
		});
});


app.controller('fleekCtrl', [
	'$scope', '$http', '$state',
	function ($scope, $http, $state) {

	$scope.model = {
		data: {},
		view: VIEW_HOME
	};


	$scope.getPhotosLink = function(photo_url) {
		var exp     = new RegExp('(.*)\/[0-9]+');
		var matches = photo_url.match( exp );
		return matches[1];
	}
}]);
