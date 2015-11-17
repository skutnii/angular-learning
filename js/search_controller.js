(function(bookStore) {

  function SearchController($scope, bookService, cartService) {
    this.scope = $scope;
    this.bookService = bookService;
    
    $scope.books = [];
    $scope.query = "";

    var self = this;
    $scope.getBooks = function() {
      self.loadBooks($scope.query);
    };

    $scope.cartService = cartService;
  };

  SearchController.prototype.loadBooks = function(query) {
    var self = this;
    this.bookService.loadBooks(query, function(books) {
      self.scope.books = books;
    })
  };

  bookStore.controller('SearchController', ['$scope', 'BookService', 'CartService', SearchController]);

})(angular.module('BookStore'));

