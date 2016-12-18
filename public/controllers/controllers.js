
 var mainApp = angular.module("mainApp", []);

 mainApp.controller('appController',function ($scope, $http) {
 	console.log("Hello world form controller");

 	function refresh() {
 		$http.get('/contactlists').then( function(response) {
	      $scope.contactList = response.data; 
	      console.log(response.data);
	      $scope.contact= '';
	   });
 	}
 	
 	 $http.get('/contactlists').then( function(response) {
      $scope.contactList = response.data; 
      console.log(response.data);
   });


 	 $scope.addContact = function(){
 	 	console.log($scope.contact);
 	 	$http.post('/contactlists',$scope.contact).then(function(response){
 	 		 $scope.contactList.push(response.data);
 	 		 $scope.contact= '';
 	 	});
 	 }


 	 //delete

 	 $scope.deleteContact = function(id){
 	 	$http.delete('/contactlists'+id).then(function (response) {
 	 		refresh();
 	 	});
 	 }

 	 //edit 


 	 $scope.editContact = function(id){
 	 	console.log(id);
 	 	$http.get('/contactlists/'+id).then(function (response) {
 	 		console.log(response);
 	 		$scope.contact = response.data;
 	 	})
 	 };

 	 //update

 	 $scope.update = function () {
 	 	var id = $scope.contact._id;
 	 	$http.put('/contactlists/'+id, $scope.contact).then(function (response) {
 	 		refresh();
 	 	})
 	 }

 });
