var app = angular.module('beerBlog', []);

app.controller('MainCtrl', [
	'$scope',
	function($scope){
		$scope.test = 'Hello world!';

		$scope.posts = [
			{title: 'beer 1', upvotes: 5},
			{title: 'beer 2', upvotes: 4},
			{title: 'beer 3', upvotes: 3},
			{title: 'beer 4', upvotes: 2},
			{title: 'beer 5', upvotes: 1}
		
		];

		$scope.addPost = function(){
			// prevents user from posting an empty post
			if(!$scope.title || $scope.title === ''){return;}
			$scope.posts.push({
				title: $scope.title,
				link: $scope.link,
				upvotes: 0
			});
			$scope.title = '';
			$scope.link = '';
		};

		$scope.incrementUpvotes = function(post){
			post.upvotes += 1;
		}


	}]);