var myApp =  angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http){

	var editing = false;

	var refresh =  function(){

		$http.get('/contactlist').success(function (response){

			console.log('I get a response');

			$scope.contactlist = response;
		});
	}

	refresh();

	$scope.addContact =  function(){
		console.log($scope.contact);
		console.log('editing:' + editing);

		if(editing){

			console.log('Cant add, edit action is in progress');
			return false;
		} else{
			console.log('tu madre');
		}
			console.log('tu madre 2');

		$http.post('/contactlist', $scope.contact).success(function (response){
			console.log(response);
			refresh();
		});
		$scope.contact = "";
	}

	$scope.remove = function(id){
		console.log(id);

		$http.delete('/contactlist/' + id).success( function (response){

			refresh();
		});
	}

	$scope.edit = function(id){

		editing = true;
		console.log('editing:' + editing);

		$http.get('/contactlist/' + id).success(function (response){
			$scope.contact = response;
		})
	}

	$scope.update = function(){
		console.log($scope.contact._id);

		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});

		editing = false;
		console.log('editing:' + editing);
		$scope.contact = "";
	}

	$scope.deselect = function(){
		$scope.contact = "";
		editing = false;
		console.log('editing:' + editing);
	}

}]);