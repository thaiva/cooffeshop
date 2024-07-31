var app=angular.module('myapp',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "view/home.html",
        controller: "homeCtrl",
      })
      // chi tiết bài viết
      .when("/news", {
        templateUrl: "view/news.html",
        controller: "newsCtrl",
  
      })
      // giỏ hàng
      .when("/cart", {
        templateUrl: "view/cart.html",
        controller: "cartCtrl",
  
      })
      .when("/login", {
        templateUrl: "view/login.html",
        controller: "loginCtrl",
      })
      .when("/register", {
        templateUrl: "view/register.html",
        controller: "loginCtrl",
      })
    .when('/products',{
        templateUrl: "view/products.html",
        controller:"homeCtrl"
    })
    .when('/detail/:id',{
        templateUrl: "view/detail.html",
        controller:"detailCtrl"
    })
  
    .when('/products',{
      templateUrl: "view/products.html",
      controller:"homeCtrl"
  })
  .when('/contact',{
    templateUrl: "view/contact.html",

})
    .otherwise({
        template:"404 ko tìm thấy trang!"
    })
});