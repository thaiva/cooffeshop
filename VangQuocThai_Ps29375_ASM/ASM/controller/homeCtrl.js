app.controller('homeCtrl', function($scope,$rootScope, $http) {  
    $scope.dssp = [];
    $http.get('http://localhost:3000/product').then(
      function(res) {
        $scope.dssp = res.data;
      },
      function(res) {
       
      }
    );
    $scope.showsp =function(sp){
      $rootScope.sanpham=sp;
    };
   
    
    $scope.mua = function(sp) {
      $rootScope.cart = $rootScope.cart || [];
      
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
      sp.tong = sp.price * sp.quantity;
      console.log(sp);
    };
      
      $scope.limit =8;
      $scope.page =1;
      $scope.begin =($scope.page-1)*$scope.limit;
      $scope.chuyentrang=function(trang){
          $scope.page=trang;
          $scope.begin =($scope.page-1)*$scope.limit;
      }
      $scope.totalPage=function(){
          return Math.ceil($scope.dssp.length/$scope.limit)
      }
      $scope.pageList = function() {
          let arr = [];
          let totalPage = $scope.totalPage();
          for (let i = 1; i <= totalPage; i++) {
            arr.push(i);
          }
          return arr;
        }
     
        
  })
  .filter('search', function() {
    return function(input, keyword, attr) {
      let kq = [];
      if (keyword) {
        keyword = keyword.toLowerCase();
        attr.forEach(thuoctinh => {
          let tmp = input.filter(item => {
            return item[thuoctinh].toString().toLowerCase().indexOf(keyword) >= 0;
          });
          kq.push(...tmp);
        });
      } else {
        kq = input;
      }
      return kq;
    };
  })