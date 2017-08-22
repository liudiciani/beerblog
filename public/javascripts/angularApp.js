var app = angular.module('app',['ui.router']);

//https://firebase.google.com/docs/database/#implementation_path
//THIS IS WHERE YOU LEFT OFF!! Try connecting to database to read/write data to UI thx


//CONFIGURE HOME STATE USING UI-ROUTER.
//ALSO REDIRECT UKNOWN URLS TO HOMEPAGE
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/test.html',
			controller: 'TestCtrl'
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

		$stateProvider.state('test', {
		 	url: '/test',
		 	templateUrl: '/test.html',
		 	controller: 'TestCtrl'
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
}]);


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

	app.factory('dataService', function($http){
	    return {
	        getdata: function(){
	              return $http.get('/javascripts/testJSON.json'); // You Have to give Correct Url either Local path or api etc 

	        }
	    };
	});

	app.controller('TestCtrl', function($scope, dataService){
		//var jsonStr = null;
		//var obj = null;
		//var newObj = null;

		var jsonObj;
		var jsonArray;

		dataService.getdata().success(function (data){
             jsonObj = data;
             jsonArray = data.beers;
             $scope.beers = jsonArray;
        });
        dataService.getdata().error(function(data,status,error,config){
       		$scope.message = "error loading data!";
    	});

    
    
        $scope.addBeer = function(){
        	//returns JSON object 
        	//$scope.message = jsonObj;

        	//returns array in JSON
			//$scope.message2 = jsonArray;

			//returns 0th element in array
			//$scope.message3 =  jsonArray[0];

			//returns 'name' field of 0th element in array
			//$scope.message4 = jsonArray[0].name;

			//returns length of array
			//$scope.message5 = jsonArray.length;


			if(!$scope.name || $scope.name === ''){return;}


			var newObj =  {
				"name":$scope.name,
				"rating":$scope.rating,
				"style":$rating,
				"ABV":$scope.ABV,
				"brewery":$scope.brewery,
				"availability":$scope.availability,
				"location":$scope.location,
				"comments":$scope.comments
			}

			//jsonArray[length] = newObj;
			jsonArray.push(newObj);


		};
	});
        	
