angular
    .module('pessoas', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'listar.html'
            })
            .when('/pessoa/adicionar',{
                templateUrl: 'adicionar.html',
                controller: 'CtrlAdicionar'
            })
            .when('/pessoa/:index', {
                templateUrl: 'editar.html',
                controller: 'CtrlEditar'
            });
    }])

    .controller('CtrlPessoas', ['$scope', '$http', function($scope, $http){
        if (typeof $scope.pessoas === 'undefined' || $scope.pessoas.length == 0) {
            $http.get('http://jsonplaceholder.typicode.com/users').success(function (response) {
                $scope.pessoas = response;
            });
        }

        $scope.excluir = function(index){
            $scope.pessoas.splice(index, 1);
        };
    }])

    .controller('CtrlAdicionar', ['$scope', '$location', function($scope, $location){
        $scope.add = function(){
            $scope.pessoas.push($scope.formData);
            $scope.formData = null;
            $location.path('/');
        }
    }])

    .controller('CtrlEditar', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams){
        $scope.formData = $scope.pessoas[$routeParams.index];

        $scope.editar = function(){
            //$scope.pessoas.push($scope.formData);
            //$scope.formData = null;
            $location.path('/');
        }
    }]);
