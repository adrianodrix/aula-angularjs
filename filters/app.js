angular
    .module('app', [])
    .filter('upper', function(){
        return function(input){
            return input.toUpperCase();
        }
    })
    .filter('lower', function(){
        return function(input){
            return input.toLowerCase();
        }
    })
    .filter('case', function(){
        return function(input, type){
            if (type === 'upper') {
                return input.toUpperCase();
            } else if (type === 'lower') {
                return input.toLowerCase();
            } else {
                return input;
            }
        }
    })
    .directive('sonClick', [function() {
        function link(scope, element, attrs){
            element.bind('click', function(){
                scope.$eval(attrs.sonClick);
            });
        }

        return {
            restrict: 'A',
            link: link
        }
    }])
    .directive('sonClic', [function() {
        function link(scope, element, attrs){
            element.bind('click', function(){
                scope.$eval(attrs.click);
            });
        }

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<button style="color: red;" ng-transclude></button>',
            link: link
        }
    }])
    .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

        function link(scope, element, attrs) {
            var format,
                timeoutId;

            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            link: link
        };
    }])
    .controller('CtrlApp',['$scope', function($scope){
        $scope.format = 'M/d/yy h:mm:ss a';
        $scope.frase = "Ola, meu nome  é Adriano Santos!!!";

        $scope.executa = function(){
            alert('diretiva clicada!');
        };
    }]);
