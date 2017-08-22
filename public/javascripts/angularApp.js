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

			 //    database.goOnline();
			
				// var rootRef = firebase.database().ref('beers/0/name');
				// rootRef.once('value').then(function(snapshot)){
				// var key = snapshot.val().key; //"Jigsaw Jazz"
				 
				// post.upvotes += 100000000; 
				// }
			
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

	app.factory('Myservice', function($http){
	    return {
	        getdata: function(){
	              return $http.get('/javascripts/testJSON.json'); // You Have to give Correct Url either Local path or api etc 

	        }
	    };
	});

	app.controller('TestCtrl', function($scope, Myservice){

		Myservice.getdata().success(function (data){
                   $scope.beers=data.beers; // as per  emilySmitley Answer which is Working Good
                   });
        Myservice.getdata().error(function(data,status,error,config){
       	
       			 		$scope.message = "error loading data!";
    });
        	});

// app.controller('LoginCtrl', [
// 	'$scope',
// 	function($scope){
// 		$scope.addUser = function(){
// 			  admin.auth().createUser({
// 			  email: "test@example.com",
// 			  uid: "test-uid",
// 			  emailVerified: true,
// 			  password: "password",
// 			  displayName: "Test",
// 			  photoURL: "http://4.bp.blogspot.com/-x_QDRsKtCko/UgWs4GzqOgI/AAAAAAAAEJU/KzBJO_r6MaI/s1600/Funny-Animals-Dog-Smoking.jpg",
// 			  disabled: false
// 			})
// 			  .then(function(userRecord) {
// 			    // See the UserRecord reference doc for the contents of userRecord.
// 			    console.log("Successfully created new user:", userRecord.uid);
// 			  })
// 			  .catch(function(error) {
// 			    console.log("Error creating new user:", error);
//   			});
// 		};
// 	};
// }]);




