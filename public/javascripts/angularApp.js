var app = angular.module('app',['ui.router']);

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

		$stateProvider.state('login', {
		 	url: '/login',
		 	templateUrl: '/login.html',
		 	controller: 'LoginCtrl'
		 });

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

		$scope.posts = posts.posts; 


		$scope.addPost = function(){
			// prevents user from posting an empty post
			if(!$scope.name || $scope.name === ''){return;}
			
			$scope.posts.push({
				name: $scope.name,
				content: $scope.content,
				rating: $scope.rating,
				upvotes: 0,
				comments: [
					{author: 'Joe', body: 'Cool post!', upvotes: 0},
					{author: 'Phil', body: 'Dece', upvotes: 0}
				]

			});

			$scope.name = '';
			$scope.content = '';
			$scope.rating = '';
		};

		$scope.incrementRating = function(post){
			if(post.rating < 10){
				post.rating += 1;
			}
		}

		$scope.incrementUpvotes = function(post){
			post.upvotes += 1;
		}


		
	}

//https://firebase.google.com/docs/database/web/read-and-write
	// function writeNewPost(uid, username, picture, title, body) {
	// 	  // A post entry.
	// 	  var postData = {
	// 	    author: username,
	// 	    uid: uid,
	// 	    body: body,
	// 	    title: title,
	// 	    starCount: 0,
	// 	    authorPic: picture
	// 	  };

	// 	  // Get a key for a new Post.
	// 	  var newPostKey = firebase.database().ref().child('posts').push().key;

	// 	  // Write the new post's data simultaneously in the posts list and the user's post list.
	// 	  var updates = {};
	// 	  updates['/posts/' + newPostKey] = postData;
	// 	  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

	// 	  return firebase.database().ref().update(updates);
	// 	}
]);

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



 