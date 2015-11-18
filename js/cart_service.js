(function(bookStore) {
  function CartEntry(book) {
    this.book = book;
    this.count = 0;
  }

  CartEntry.prototype = { 
    cost: function() {
      return this.book.retailPrice.amount * this.count;
    },

    increaseCount: function() {
      this.count++;
    },

    decreaseCount: function() {
      this.count--;
    }
  };

  CartEntry.prototype.constructor = CartEntry;

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
      if (!angular.isDefined(count)) {
        count = 1;
      };

      var entry = this.storage[id];
      if (angular.isDefined(entry)) {
        entry.count -= count;
        if (entry.count <= 0) {
          delete this.storage[id];
        }
      }
    },

    totalCost: function() {
      var cost = 0;
      for (var key in this.storage) {
        cost += this.storage[key].cost();
      }

      return cost;
    },

    itemsCount: function() {
      var count = 0;
      var storage = this.storage;
      
      for (var key in storage) {
        if (storage.hasOwnProperty(key)) {
          count++;
        }
      }

      return count;
    },

    isEmpty: function() {
      return (0 == this.itemsCount());
    },

    isNotEmpty: function() {
      return !this.isEmpty();
    },

    hasBook: function(book) {
      return angular.isDefined(this.storage[book.id]);
    }
  };

  CartService.prototype.constructor = CartService;

  bookStore.factory('CartService', function() {
    return new CartService();
  });
})(angular.module('BookStore'));