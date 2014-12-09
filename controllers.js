angular.module('AddressBookApp')
	.controller('ListController', function($scope, Contact, $location){
		$scope.contacts = Contact.query();

		$scope.headers = ['firstName', 'lastName', 'email'];

		$scope.sort = function(header){
			$scope.sort.header = header;
			$scope.sort.order = !$scope.sort.order;
		};

		$scope.sort.header = 'firstName';
		$scope.sort.order = false;

		$scope.edit = function(id){
			$location.url("/contact/" + id);
		};

		$scope.new = function(id){
			$location.url("/contact/new");
		};
	})
	.controller('NewController', function($scope, Contact, $location){
		$scope.contact = new Contact({
			firstName: ['', 'text'],
			lastName: ['', 'text'],
			email: ['', 'email'],
			phone: ['', 'tel'],
			mobile: ['', 'tel'],
			web: ['', 'url'],
			address: ['', 'text'],
		});

		$scope.save = function(){
			if($scope.newContact.$invalid){
				$scope.$broadcast('record:invalid');
			}else{
				$scope.contact.$save();
				$location.url('/contacts');
			}
		};

		$scope.cancel = function(){
			$location.url('/contacts');
		};

	}).controller('EditController', function($scope, Contact, $location, $routeParams){
		$scope.contact = Contact.get({ id: parseInt($routeParams.id, 10) });

		$scope.delete = function(){
			$scope.contact.$delete();
			$location.url('/contacts');
		};

		$scope.cancel = function(){
			$location.url('/contacts');
		};
	});