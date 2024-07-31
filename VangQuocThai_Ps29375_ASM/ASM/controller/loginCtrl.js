app.controller('loginCtrl', function($scope, $routeParams, $http, $location, $rootScope) {
    $scope.isError = false;
    $scope.login = function() {
        $http.get(`http://localhost:3000/users?email=${$scope.email}&password=${$scope.password}`).then(
            function(res) {
                if (res.data.length == 0) {
                    $scope.isError = true; // đăng nhập không thành công
                } else {
                    $rootScope.user = res.data[0];
                    localStorage.setItem('user', JSON.stringify(res.data[0])); // đăng nhập thành công
                    $location.path('/');
                }
            },
            function(res) {
                $scope.isError = true;
            }
        );
    };

    $scope.register = function() {
        $http.post(`http://localhost:3000/users`, {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password,
        }).then(
            function (){   
                alert('Đăng ký thành công');
                $location.path('/login');
            }
        )
    };
    $scope.passwordsMatch = false;

    $scope.$watchGroup(['password', 'confirmPassword'], function (newValues) {
      $scope.passwordsMatch = newValues[0] === newValues[1];
    });
});