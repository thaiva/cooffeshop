app.controller('newsCtrl',function($scope,$http,$routeParams){
    $scope.dsTT =  [];
    $scope.tintuc = {};
    $http.get('http://localhost:3000/news').then(
        function(response){ // true
            $scope.dsTT = response.data;
        },
        function (response){  //false
            
        }
    );
})