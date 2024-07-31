app.controller('detailCtrl', function($scope, $routeParams, $rootScope, $http) {
    $scope.dssp = [];
    $rootScope.cart = localStorage.getItem('CART') ? JSON.parse(localStorage.getItem('CART')) : [];

    $http.get('http://localhost:3000/product').then(
        function(res) {
            $scope.dssp = res.data;

            $scope.id = $routeParams.id;

            if ($scope.dssp && Array.isArray($scope.dssp)) {
                $scope.sp = $scope.dssp.filter(i => i.id == $scope.id)[0];
            } else {
                // Handle the case when dssp is not an array
            }
        },
        function(res) {
            alert('Lỗi ko tải đc dữ liệu');
        }
    );

    $scope.showsp = function(sp) {
        $rootScope.sanpham = sp;
    };

    $scope.mua = function(sp) {
        if ($rootScope.cart.filter(i => i.id == sp.id).length == 0) {
            sp.quantity = 1;
            $rootScope.cart.push(sp);
            localStorage.setItem('CART', JSON.stringify($rootScope.cart));
        } else {
            $rootScope.cart.forEach(i => {
                if (i.id == sp.id) {
                    i.quantity++;
                    localStorage.setItem('CART', JSON.stringify($rootScope.cart));
                }
            });
        }
    };
    
  // cmt
  $scope.comment = function() {
    var defaultName = "user";
    if ($scope.user && $scope.user.name) {
        defaultName = $scope.user.name;
    }
    
    $http.post(`http://localhost:3000/comment`, {
        idNews: $routeParams.id,
        content: $scope.content,
        name: defaultName,
        idUser: $scope.user ? $scope.user.id : "",
        date: new Date().toLocaleString("sv-SE"),
    })
    .then(function(res) {
        $scope.content = "";
        $scope.loadcomment();
    });
};
  $scope.dsBL = [];
  $scope.loadcomment = function () {
    $http
      .get(`http://localhost:3000/comment?idNews=${$routeParams.id}`)
      .then(function (res) {
        $scope.dsBL = res.data;
        console.log( $scope.dsBL )
      });
  };
  $scope.loadcomment();
  // gioiws hạn cmt
  $scope.limit = 5;

  // delcmt
  $scope.delcmt = function (id) {
    $http.delete(`http://localhost:3000/comment/${id}`)
      .then(function (res) {
        $scope.loadcomment();
      });
  };
});