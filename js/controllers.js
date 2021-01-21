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




angular.module('inspinia').controller('LoginCtrl', function($scope,$http){

	$scope.user = {};

	$scope.login = function(){
		$http.post('https://erp.r85motos.cl/api/index.php/login', $scope.user).then(function(response){
			
			if(response.data == undefined)
				return

			data = response.data.success; 
			console.log(data);

			$http.get('https://erp.r85motos.cl/api/index.php/users/info?DOLIAPIKEY='+data.token, {headers:{'DOLIAPIKEY':data.token}}).then(function(response){
				console.log(response);
			});
			
		});
	}

})