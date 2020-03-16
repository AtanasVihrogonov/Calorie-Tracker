// Storage Controler

/* =========================================================== 
Item Controler 
=========== */
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
      // { id: 0, name: 'Avocado', calories: 400 },
      // { id: 0, name: 'Eggs', calories: 300 },
      // { id: 0, name: 'Lettuce', calories: 200 }
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
      let ID;
      // Create ID
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);
      // Create new item
      newItem = new Item(ID, name, calories);
      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      // Loop throogh items
      data.items.forEach(function(item) {
        if(item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getTotalCalories: function() {
      let total = 0;

      // Loop through item and add cals
      data.items.forEach(function(item) {
        total += item.calories;
      });
      // Set total cal in data structure
      data.totalCalories = total;
      // Return totals
      return data.totalCalories;
    },
    logData: function() {
      return data;
    }
  }
})();

/* =========================================================== 
UI Controler 
=========== */
const UIController = (function() {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
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
    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function() {
      UIController.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();

/* =========================================================== 
App Controler 
=========== */
const AppController = (function(ItemController, UIController) {
  // Load Event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UIController.getSelectors();
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
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
      // Add item ti UI list
      UIController.addListItem(newItem);
      // Get the total calories
      const totalCalories = ItemController.getTotalCalories();
      // Add total calories to UI
      UIController.showTotalCalories(totalCalories);
      // Clear fields
      UIController.clearInput();
    }
  }

  // Update item submit
  const itemUpdateSubmit = function(e) {
    e.preventDefault();

    if(e.target.classList.contains('edit-item')) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;
      // Break into an array
      const listIdArr = listId.split('-');
      // Get the actual id
      const id = parseInt(listIdArr[1]);
      // Get item
      const itemToEdit = ItemController.getItemById(id);
      // Set current item
      ItemController.setCurrentItem(item);
      
    } 
  }

  // Public methods
  return {
    init: function() {
      // Clear edit state/ set initial set
      UIController.clearEditState();
      // Fetch items from data structure
      const items = ItemController.getItems();

      // Check if any items
      if(items.length === 0) {
        UIController.hideList();
      } else {
        // Populate list with items
        UIController.populateItemList(items);
      }

      // Get the total calories
      const totalCalories = ItemController.getTotalCalories();
      // Add total calories to UI
      UIController.showTotalCalories(totalCalories);
      // Load event listeners
      loadEventListeners();
    },
  }
})(ItemController, UIController);

// Initialize app
AppController.init();