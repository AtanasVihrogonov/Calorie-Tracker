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
    logData: function() {
      return data;
    }
  }
})();



// UI Controler
const UIController = (function() {

  // Public methods
  return {

  }
})();



// App Controler
const AppController = (function(ItemController, UIController) {

  // Public methods
  return {
    init: function() {
      console.log('Initializing App...');
    }
  }

})(ItemController, UIController);

// Initialize App
AppController.init();