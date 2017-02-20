angular.module('ionicApp', ['ionic','ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.Gallery', {
      url: '/Gallery',
      views: {
        'Gallery-tab': {
          templateUrl: 'templates/Gallery.html',
          controller: 'ExampleController'
        }
      }
    })
    
    .state('Registration', {
      url: '/Registration',
      templateUrl: 'templates/Registration.html',
      controller: ''
    })
    .state("secure", {
            url: "/secure",
            templateUrl: "templates/secure.html",
            controller: "SecureController"
        })
    .state('tabs.contact', {
      url: '/contact',
      views: {
        'contact-tab': {
          templateUrl: 'templates/contact.html'
        }
      }
    });


   $urlRouterProvider.otherwise('/sign-in');

})

.controller('SignInCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.user= {};
  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
  $scope.signIn = function(user) {
    LoginService.loginUser($scope.user.username,$scope.user.password).success(function(user){
      $state.go('tabs.home');
    }).error(function(user){
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed!',
        template: 'Please enter username and password!'
 
        
       
      });
    });
 
  }
  
})








.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})
.controller('ExampleController',function($scope)
 {
$scope.images = [];
$scope.loadImages = function() {
for(var i = 0; i < 100; i++) {
$scope.images.push({id : i, src : "http://placehold.it/50x50"});
    }
  }
})
.controller("PictureCtrl", function ($scope, $cordovaCamera) {
 
                $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
            })
.service('LoginService',function($q){
  return {
    loginUser: function(name,pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      if(name ==  'harsha' && pw == 'komalla') {
        deferred.resolve('HELLO' + name + '!');
      } else {
        deferred.reject('Please enter correct username/password');
      }
      promise.success=function(fn){
        promise.then(fn);
        return promise;
      }
      promise.error=function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
});
$scope.signin=function(username,password ){
  console.log("inside login function");
  $http({
    method:'POST',
    url:'https://api.mongolab.com/api/1/databases/asedemo/collections/users?apiKey=lIjqbijHmg2Tr-xx1JXsbF83YPprQ1h8',
      data:JSON.stringify({
                      name:username,
                      password:password }),
                      contentType:"application/json"
    }).sucess(function (){
    } )
}
    