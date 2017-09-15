var app = angular.module('app',['ui.router']);

//https://firebase.google.com/docs/database/#implementation_path
//THIS IS WHERE YOU LEFT OFF!! Try connecting to database to read/write data to UI since u couldn't figure it out last time, thx dumbass


//CONFIGURE HOME STATE USING UI-ROUTER.
//ALSO REDIRECT UKNOWN URLS TO HOMEPAGE
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'HomeCtrl'
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

		$stateProvider.state('catalog', {
		 	url: '/catalog',
		 	templateUrl: '/catalog.html',
		 	controller: 'HomeCtrl'
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
// app.controller('MainCtrl', [
// 	'$scope',
// 	'posts',
// 	function($scope, posts){

		

// 		$scope.posts = posts.posts; 


// 		$scope.addPost = function(){
			
			
// 			// prevents user from posting an empty post
// 			if(!$scope.name || $scope.name === ''){return;}
			
// 			$scope.posts.push({
// 				name: $scope.name,
// 				content: $scope.content,
// 				rating: $scope.rating,
// 				upvotes: 0,
// 				comments: [
// 					{author: 'Joe', body: 'Cool post!', upvotes: 0},
// 					{author: 'Phil', body: 'Dece', upvotes: 0}
// 				]

// 			});

// 			$scope.name = '';
// 			$scope.content = '';
// 			$scope.rating = '';
// 		};

// 		$scope.incrementRating = function(post){
// 			if(post.rating < 10){
// 				post.rating += 1;
// 			}
// 		}

// 		$scope.incrementUpvotes = function(post){
// 			post.upvotes += 1;

// 			}
// 		}

// ]);

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




	app.controller('HomeCtrl', function($scope, dataService, styleDataService){
		var jsonObj;
		var jsonArray;
		var stylesJsonObj;
		var stylesJsonArray;

		dataService.getdata().success(function (data){
             jsonObj = data;
             jsonArray = data.beers;
             $scope.beers = jsonArray;
        });

        dataService.getdata().error(function(data,status,error,config){
       		$scope.message = "error loading data :(";
    	});	


    	styleDataService.getdata().success(function (data){
             stylesJsonObj = data;
             stylesJsonArray = data.styles;
             $scope.styles = stylesJsonArray;
        });

        styleDataService.getdata().error(function(data,status,error,config){
       		$scope.message = "error loading data!";
    	});


    	
    
        $scope.addBeer = function(){
			var id = jsonArray.length + 1;
			var availability = null;
			var location = null;

			if(!$scope.availability || $scope.availability === ''){
				availability = "-"
			}
			if(!$scope.location || $scope.location === ''){
				location = "-"
			}

			var newObj =  {
				"name":$scope.name,
				"rating":document.getElementById("rating").value,
				"style":$scope.style,
				"ABV":$scope.ABV,
				"brewery":$scope.brewery,
				"availability":$scope.availability,
				"location":$scope.location,
				"description":$scope.description,
				"id": id
			}
			jsonArray.push(newObj);
			$scope.beers = jsonArray;

		};
	});
        

    app.factory('dataService', function($http){
	    return {
	        getdata: function(){
	              return $http.get('/javascripts/testJSON.json'); 
	        }
	    };
	});

	app.factory('styleDataService', function($http){
	    return {
	        getdata: function(){
	              return $http.get('/javascripts/stylesJSON.json'); // You Have to give Correct Url either Local path or api etc 

	        }
	    };
	});	


    app.directive("optional", function() {
    return {
        restrict: 'A', // only for attributes
        compile: function(element) {
            // insert asterisk after elment 
            element.css('border-color', "gray")
        }
    };
});


    app.directive("required", function() {
    return {
        restrict: 'A', // only for attributes
        compile: function(element) {
            // insert asterisk after elment 
            element.css('border-color', "black")
        }
    };
});
