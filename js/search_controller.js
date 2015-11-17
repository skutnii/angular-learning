(function(bookStore) {

  function SearchController($scope, bookService) {
    this.scope = $scope;
    this.bookService = bookService;
    
    $scope.books = [];
    $scope.query = "";

    var self = this;
    $scope.getBooks = function() {
      self.loadBooks($scope.query);
    }
  };

  SearchController.prototype.loadBooks = function(query) {
    var self = this;
    this.bookService.loadBooks(query, function(books) {
      self.scope.books = books;
    })
  };

  bookStore.controller('SearchController', ['$scope', 'BookService', SearchController]);

})(angular.module('book_store'));

