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

	app.factory('styleDataService', function($http){
	    return {
	        getdata: function(){
	              return $http.get('/javascripts/stylesJSON.json'); // You Have to give Correct Url either Local path or api etc 

	        }
	    };
	});

	

	



	app.controller('TestCtrl', function($scope, dataService, styleDataService){
		//var jsonStr = null;
		//var obj = null;
		//var newObj = null;




		var jsonObj;
		var jsonArray;
		var stylesJsonObj;
		var stylesJsonArray;

		dataService.getdata().success(function (data){
			 
             jsonObj = data;
             jsonArray = data.beers;
             $scope.beers = jsonArray;
   //          $scope.message = jsonArray;
        });

        dataService.getdata().error(function(data,status,error,config){
       		$scope.message = "error loading data!";
    	});




    	styleDataService.getdata().success(function (data){
             stylesJsonObj = data;
             stylesJsonArray = data.styles;
             $scope.styles = stylesJsonArray;
             $scope.message = stylesJsonArray;
        });

        styleDataService.getdata().error(function(data,status,error,config){
       		$scope.message = "error loading data!";
    	});


    	


    
    
        $scope.addBeer = function(){

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
				"availability":availability,
				"location":location,
				"description":$scope.description
			}


			var rating = $scope.rating;

			jsonArray.push(newObj);

			$scope.beers = jsonArray;





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
