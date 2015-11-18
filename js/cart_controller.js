angular.module('BookStore').controller('CartController', ['$scope', 'CartService', function($scope, cartService) {
  $scope.cartService = cartService;
}]);