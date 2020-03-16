// Storage Controler
const StorageController = (function(){
  // Public methods
  return {
    storeItem: function(item) {
      let items;
      // Check if any items in ls
      if(localStorage.getItem('items') === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Re set LS
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index) {
        if(updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index) {
        if(id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  }
})();

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
    // items: [
    //   // { id: 0, name: 'Avocado', calories: 400 },
    //   // { id: 0, name: 'Eggs', calories: 300 },
    //   // { id: 0, name: 'Lettuce', calories: 200 }
    // ],
    items: StorageController.getItemsFromStorage(),
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
    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);
      
      let found = null;
      data.items.forEach(function(item) {
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: function(id) {
      // Get ids
      const ids = data.items.map(function(item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);
      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function() {
      data.items = [];
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
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
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
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
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turtn Node list intu array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories;
      UIController.showEditState();
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(item) {
        item.remove();
      });
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
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();

/* =========================================================== 
App Controler 
=========== */
const AppController = (function(ItemController, StorageController, UIController) {
  // Load Event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UIController.getSelectors();
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UIController.clearEditState);
    // Clear item event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
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

      // Store in localStorage
      StorageController.storeItem(newItem);
      // Clear fields
      UIController.clearInput();
    }
  }

  // Click edit item
  const itemEditClick = function(e) {
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
      ItemController.setCurrentItem(itemToEdit);
      // Add item to form
      UIController.addItemToForm();
    } 
  }

  // Update item submit
  const itemUpdateSubmit = function(e) {
    e.preventDefault();
    
    // Get item input
    const input = UIController.getItemInput();
    // Update item
    const updatedItem = ItemController.updateItem(input.name, input.calories);
    // Update UI
    UIController.updateListItem(updatedItem);
    // Get the total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to UI
    UIController.showTotalCalories(totalCalories);

    // Update local storage
    StorageController.updateItemStorage(updatedItem);

    UIController.clearEditState();
  }

  // Delete button event
  const itemDeleteSubmit = function(e) {
    e.preventDefault();

    // Get current item
    const currentItem = ItemController.getCurrentItem();
    // Delete from data structure
    ItemController.deleteItem(currentItem.id);
    // Delete from UI
    UIController.deleteListItem(currentItem.id);
    // Get the total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to UI
    UIController.showTotalCalories(totalCalories);
    // Delete from local storage
    StorageController.deleteItemFromStorage(currentItem.id);

    UIController.clearEditState();
  }

  // Clear item event
  const clearAllItemsClick = function() {
    // Delete all items from data structure
    ItemController.clearAllItems();
    // Get the total calories
    const totalCalories = ItemController.getTotalCalories();
    // Add total calories to UI
    UIController.showTotalCalories(totalCalories);
    // remove from UI
    UIController.removeItems();
    // Clear from local storage
    StorageController.clearItemsFromStorage();
    // Hide the UL
    UIController.hideList();
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
})(ItemController, StorageController, UIController);

// Initialize app
AppController.init();