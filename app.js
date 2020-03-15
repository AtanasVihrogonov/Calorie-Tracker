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
    addItem: function(name, calories) {
      // Create ID
      
    },
    logData: function() {
      return data;
    }
  }
})();

/////////////////////////////////////////////////////////////////////////////////

// UI Controler
const UIController = (function() {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

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

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();

////////////////////////////////////////////////////////////////////////////////////////////

// App Controler
const AppController = (function(ItemController, UIController) {
  // Load Event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UIController.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  // Add item submit
  const itemAddSubmit = function(e) {
    e.preventDefault();

    // Get from input from UI Controler
    const input = UIController.getItemInput();

    // Check for name and calories input
    if(input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemController.addItem(input.name, input.calories);
    }

    
  }

  // Public methods
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemController.getItems();

      // Populate list with items
      UIController.populateItemList(items);

      // Load event listeners
      loadEventListeners();
    },
  }

})(ItemController, UIController);

// Initialize app
AppController.init();