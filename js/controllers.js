/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl() {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

};


angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)




angular.module('inspinia').controller('LoginCtrl', function($scope, $window, $state, $http){

	$scope.user = {};
	$scope.message = { };
	$scope.loading = false;

	$scope.login = function(){
		$scope.loading=true;
		$http.post('http://nova.data/erp.r85motos.cl/htdocs/api/index.php/login', $scope.user).then(function(response){
			data = response.data.success; 
			$window.sessionStorage.setItem('token', data.token);

			//optener informacion de usuario
			$http.get('http://nova.data/erp.r85motos.cl/htdocs/api/index.php/users/info').then(function(response){
				$window.sessionStorage.setItem('user', response.data);
				$scope.message.status = 'alert-success';
				$scope.message.mensaje = 'Iniciando sesión';
				$scope.loading=false;
				//peticion para guardar el usuario en storage
				$state.go('app.home');
			}, function(response){
				$scope.message.status = 'alert-danger';
	            $scope.message.mensaje = 'No se obtuvieron los datos del usuario';
	            $scope.loading=false;
			});	
		}, function(response) {
            $scope.message.status = 'alert-danger';
            $scope.message.mensaje = response.data.error.message;
            $scope.loading=false;
        });
	}

});

angular.module('inspinia').controller('HomeCtrl', function($window,$scope, $http){

	//obteniendo clientes
	var terceros = [];
	$http.get('http://nova.data/erp.r85motos.cl/htdocs/api/index.php/thirdparties').then(function(response){
		
		angular.forEach(response.data, function(value, key) {
			terceros[value.id] = value;
		});
		$window.sessionStorage.setItem('thirdparties', JSON.stringify(terceros));
	});

});


angular.module('inspinia').controller('PresupuestoCtrl', function($window,$scope, $http){

	$scope.terceros = JSON.parse($window.sessionStorage.getItem('thirdparties'));
	$scope.error = '';

	console.log($scope.terceros);
	$scope.listar = function(){
		$http.get('http://nova.data/erp.r85motos.cl/htdocs/api/index.php/proposals?sortorder=desc').then(function(response){
			$scope.presupuestos = response.data;
			console.log($scope.presupuestos);
		}, function(response){
            $scope.error = 'No se obtuvieron los datos del usuario';
		});	

	}

	$scope.listar();

});