app.controller("mainCtrl", function ($rootScope) {
    if (localStorage.getItem("user")) {
      $rootScope.user = JSON.parse(localStorage.getItem("user"));
    }
    $rootScope.logout = function () {
      localStorage.removeItem("user");
      $rootScope.user = undefined;
    }
  
    // chạy qua ít nhất 1 lần
    if(localStorage.getItem('CART')){ // kiểm tra xem trong localstorage có hay k
      $rootScope.cart = [];// nếu k có thì cart = rỗng
      $rootScope.cart = JSON.parse(localStorage.getItem('CART'));// có thì lấy từ localStorage ra 
      
  }
  })
.run(function($rootScope){

    $rootScope.$on('$routeChangeStart',function(){
        $rootScope.isLoading=true;
    });
    $rootScope.$on('$routeChangeSuccess',function(){
       $rootScope.isLoading=false;
    });
    $rootScope.$on('$routeChangeErorr',function(){
        $rootScope.isLoading=true;
        alert('Lỗi không tải đc trang')
    });
})