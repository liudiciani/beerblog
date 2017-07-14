var app = angular.module('beerBlog', ['ui.router']);

//CONFIGURE HOME STATE USING UI-ROUTER.
//ALSO REDIRECT UKNOWN URLS TO HOMEPAGE
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});

		$stateProvider.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

		// $stateProvider.state('login', {
		// 	url: '/login',
		// 	templateUrl: '/login.html',
		// 	controller: 'LoginCtrl'
		// });

		$urlRouterProvider
		.otherwise('home');

	}]);



// POST VARIABLE HOLDS DYNAMIC DATA ENTERED IN FORM IN THE UI
app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}])


// ADDING POSTS, UPVOTING POSTS
app.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope, posts){
		$scope.test = 'Hello world!';

		$scope.posts = posts.posts; 


		$scope.addPost = function(){
			// prevents user from posting an empty post
			if(!$scope.title || $scope.title === ''){return;}
			$scope.posts.push({
				title: $scope.title,
				link: $scope.link,
				upvotes: 0,
				comments: [
					{author: 'Joe', body: 'Cool post!', upvotes: 0},
					{author: 'Phil', body: 'Dece', upvotes: 0}
				]
			});
			$scope.title = '';
			$scope.link = '';
		};

		$scope.incrementUpvotes = function(post){
			post.upvotes += 1;
		}


	}]);

app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id]
		$scope.addComment = function(){
			if($scope.body === '') {return;}
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = '';
		};
	}]);



// app.controller('LoginCtrl', [
// 	'$scope',
// 	function($scope){
// 		$scope.message = "welcome to login page";
// 		};
// 	}]);



