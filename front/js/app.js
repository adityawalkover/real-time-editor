angular.module("real_time_doc", ['ngRoute', 'ngResource'])
    .config(['$routeProvider', function(){
        $routeProvider.
            when('/docs', {
                templateUrl: '/front/view/doc-list.html',
                controller: 'DocListCtrl'
            }).
            otherwise({
                redirectTo: '/docs'
            });
    }])
    .controller('DocListCtrl', ['$scope', '$http', function($scope){
        $scope.doc_content = "";
        $scope.doc_name = "";
        $scope.hide_doc = true;

        var socket = io.connect("http://localhost:3000");
        var from_socket_update = false;
        socket.on('set_update', function(data){
            $scope.doc_content = data.text;
            $scope.$apply();
        });
        $scope.edit_document = function() {
            socket.emit('doc_name', {name: $scope.doc_name});
            $scope.hide_doc = false;
            $scope.doc_content = "";
        };
    }]);