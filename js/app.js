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
var app         = angular.module('fleek', ['ui.router', 'ngResource', 'ngSanitize']);
var flickr_feed = 'https://api.flickr.com/services/feeds/photos_public.gne';

const VIEW_HOME = 0;

// inspired by http://jsfiddle.net/kstep/j25aj/9/
// We have to use $resource instead of $http.get because of CORS (though this is one way of addressing the issue).
app.factory('flickrPublicPhotos', function ($resource) {

	var api = {
		key   : 'ca2de41826a40f1100393ea5cfcc0e7b',
		secret: 'dfc87f940d04691f'
	};

    return {
    	feed: function() {
			return $resource(
				'http://api.flickr.com/services/feeds/photos_public.gne',
				{ format: 'json', jsoncallback: 'JSON_CALLBACK' },
				{ 'load': { 'method': 'JSONP' }
			}).load();
    	},

    	// Fetch photo information.
    	info: function(photo_id) {
			return $resource(
				'https://api.flickr.com/services/rest',
				{
					format      : 'json',
					jsoncallback: 'JSON_CALLBACK',
					method      : 'flickr.photos.getInfo',
					api_key     : api.key,
					photo_id    : photo_id
				},
				{
					load: { method: 'JSONP' }
				}
			).load();
		}
    };
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
				$scope.model.data = flickrPublicPhotos.feed();
			}
		});
});


// Our SPA (single page application) Angular controller.
app.controller('fleekCtrl', [
	'$scope', '$http', '$state', 'flickrPublicPhotos',
	function ($scope, $http, $state, flickrPublicPhotos) {


	$scope.model = {
		data: {},
		view: VIEW_HOME,
	};


	// Extract the link to the respective user's photostream from the URL of a
	// photo.
	$scope.getPhotosLink = function(photo_url) {
		var exp     = new RegExp('(.*)\/[0-9]+');
		var matches = photo_url.match( exp );
		return matches[1];
	};


	// Extract the photo ID from the URL of a photo.
	$scope.getPhotoID = function(photo_url) {
		var exp     = new RegExp('\/([0-9]+)\/$');
		var matches = photo_url.match( exp );
		return matches[1];
	};


	$scope.getPhotoInfo = function(photo_url) {
		var photo_id = $scope.getPhotoID(photo_url);

		$data = flickrPublicPhotos.info(photo_id);
		return $data.$promise;
	};



	$scope.getTitle = function(text) {
		return text && text.trim().length ? text : '<i>no title</i>';
	};


	$scope.getUserURL = function(user_id) {
		return 'https://www.flickr.com/people/' + user_id + '/';
	};


	$scope.getPhotoURL = function(user_id, photo_id) {
		return 'https://www.flickr.com/photos/' + user_id + '/' + photo_id;
	};


	$scope.getDate = function(timestamp) {
		return moment( timestamp ).format('Do MMMM YYYY [at] hh:mm');
	};

	$scope.getDescription = function(text) {
		return text && text.trim().length ? text : '<i>no description</i>';
	};


	$scope.showInfo = function(index) {

		var item = $scope.model.data.items[ index ];

		// Open a modal window.
		$scope.model.post = 'loading';
		$('#fleek-info').foundation('reveal', 'open');

		if (!item.loaded) {

			// Load the photo's details.
			$scope.getPhotoInfo(item.link).then(
				function(response) {

					// Add information to the item:
					// - the author's username
					// - any associated tags.

					item.author      = response.photo.owner.username;
					item.description = response.photo.description._content;
					item.tags        = [];
					for (var i in response.photo.tags) {
						item.tags.push( response.photo.tags[i]._content );
					}

					// Mark the item as "loaded".
					item.loaded = true;
					$scope.model.data.items[ index ] = item;

					// Display the photo's details.
					$scope.model.post = item;
				}
			);

		} else {
			// Display the already loaded photo's details.
			$scope.model.post = item;
		}
	};
}]);
