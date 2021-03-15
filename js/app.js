/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('inspinia', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
    ]).run(function(/*DTDefaultOptions,*/ $rootScope, $state, $window) {
        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (to.data && to.data.requiresLogin) {
                if (!$window.sessionStorage.getItem('token') ) {
                    e.preventDefault();
                    $state.go('login');
                }
            }
        });
        $rootScope.$state = $state;
        //DTDefaultOptions.setLanguageSource('js/i18n/spanish.json');
    });

    
})();


function status(status){
    console.log(status);
	var tmp = {};
	switch(status){

		case 1:
			tmp.class= 'default';
			tmp.name = 'No lo sé';
			tmp.id = status;
			break;
		case "2":
			tmp.class= 'default';
			tmp.name = 'No lo sé 2';
			tmp.id = status;
			break;
		case "2":
			tmp.class= 'default';
			tmp.name = 'No lo sé 3';
			tmp.id = status;
			break;
		case "4":
			tmp.class= 'default';
			tmp.name = 'Facturado';
			tmp.id = status;
			break;
	}
	return tmp;
}

