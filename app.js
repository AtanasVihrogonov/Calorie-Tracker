// Storage Controler

// Item Controller
const ItemController = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      { id: 0, name: 'Avocado', calories: 400 },
      { id: 0, name: 'Eggs', calories: 300 },
      { id: 0, name: 'Lettuce', calories: 200 }
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    logData: function() {
      return data;
    }
  }
})();



// UI Controler
const UIController = (function() {

  // Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });
    }
  }
})();



// App Controler
const AppController = (function(ItemController, UIController) {

  // Public methods
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemController.getItems();

      // Populate list with items
      UIController.populateItemList(items);
     
    }
  }

})(ItemController, UIController);

// Initialize App
AppController.init();