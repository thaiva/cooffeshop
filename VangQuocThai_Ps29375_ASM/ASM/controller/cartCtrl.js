app.controller('cartCtrl', function ($scope, $rootScope, $http, $location){
    $rootScope.tinhTong = function () {
        let tong = 0;
        if($rootScope.cart){
            $rootScope.cart.forEach(sp => {
                tong += sp.price*sp.quantity
            });

        }
        return tong;
    }
    $rootScope.tinhTongShip = function () {
        let tong = 0;
        if($rootScope.cart){
            $rootScope.cart.forEach(sp => {
                tong += sp.price*sp.quantity+15000
            });

        }
        return tong;
    }
    $rootScope.saveCart = function() {
        localStorage.setItem('CART', JSON.stringify($rootScope.cart)); // lưu giỏa hàng bằng json

    }
    $scope.delete = function (index){
        $rootScope.cart.splice(index, 1);
        $rootScope.saveCart();
    }
    $scope.clearCart = function () {
        $rootScope.cart = []
        $rootScope.saveCart();

    }
    $scope.checkOut = function () {
        $http.post(`http://localhost:3000/orders`, {
            name: $scope.name,
            idUser: "-1",
            phone: $scope.phone,
            address: $scope.address,
            products: $rootScope.cart,
            total: $scope.tinhTong(),
            date: new Date().toLocaleString('sv-SE'),
            status: "order",
        }).then(
            function (){
                $scope.clearCart();
                document.querySelector('.btn-close').click
                alert('dặt hàng thành công');
                $location.path('/');
            }
        )
    }
})