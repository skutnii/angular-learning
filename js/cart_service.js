(function(bookStore) {
  function CartEntry(book) {
    this.book = book;
    this.count = 0;
  }

  CartEntry.prototype.cost = function() {
    return this.book.retailPrice.amount * this.count;
  };

  function CartService() {
    this.storage = {};
  };

  CartService.prototype = {
    add: function(book, count) {
      if (!angular.isDefined(count)) {
        count = 1;
      };

      var storage = this.storage;
      if (!angular.isDefined(storage[book.id])) {
        var entry = new CartEntry(book);
        entry.count = count;
        storage[book.id] = entry;
      } else {
        var entry = storage[book.id];
        entry.count += count;
      }
    },

    remove: function(id, count) {
      var entry = this.storage[book.id];
      if (angular.isDefined(entry)) {
        entry.count -= count;
        if (entry.count <= 0) {
          delete this.storage[book.id];
        }
      }
    },

    totalCost: function() {
      var cost = 0;
      for (var key in this.storage) {
        cost += this.storage[key].cost();
      }

      return cost;
    } 
  };

  CartService.prototype.constructor = CartService;

  bookStore.factory('CartService', function() {
    return new CartService();
  });
})(angular.module('BookStore'));