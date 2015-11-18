(function(bookStore) {

  function Datum(values) {
    for (var key in values) {
      this[key] = values[key];
    }
  };

  function BookService($http) {
    this.http = $http;
    this.rootURL = 'https://www.googleapis.com/books/v1/volumes';
  };

  BookService.prototype = {
    createBook: function(values) {
      if (typeof values == 'undefined') {
        values = {};
      }

      return new Datum(values);
    },

    parse: function(data) {
      var initOptions = {
        id: data.id,
        saleable: false
      };

      var vInfo = data.volumeInfo;
      if (typeof vInfo != 'undefined') {
        initOptions.title = vInfo.title,
        initOptions.subtitle = vInfo.subtitle,
        initOptions.authors = vInfo.authors,
        initOptions.description = vInfo.description
      };

      var imLinks = vInfo.imageLinks;
      if (typeof imLinks != "undefined") {
        initOptions.thumbnail = imLinks.smallThumbnail;
      };

      var saleInfo = data.saleInfo;
      if (typeof saleInfo != "undefined") {
        if (saleInfo.saleability == "FOR_SALE") {
          initOptions.saleable = true;
          initOptions.retailPrice = saleInfo.retailPrice;
        }
      };

      return new Datum(initOptions);
    },

    parseArray: function(items) {
      var result = [];
      var self = this;
      
      items.forEach(function(item) {
        var datum = self.parse(item);
        result.push(datum);
      });

      return result;
    },

    loadBooks: function(query, onSuccess) {
      
      var link = this.rootURL + '?q=' + query;
      var self = this;

      function success(response) {
        var books = self.parseArray(response.data.items);
        if (typeof onSuccess != 'undefined') {
          onSuccess(books);
        }
      };

      function failure(response) {

      };

      this.http({
        method: 'GET',
        url: link
      }).then(success, failure);
    },
  };

  BookService.prototype.constructor = BookService;

  bookStore.factory('BookService', ['$http', function($http) {
    return new BookService($http);
  }]);
})(angular.module('BookStore'));