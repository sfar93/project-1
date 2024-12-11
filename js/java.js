document.addEventListener("DOMContentLoaded", function() {
  const filters = document.querySelectorAll("container");
  const checkboxe = document.querySelectorAll("checkbox");

  filters.forEach(filter => {
    filter.addEventListener('change', () => {
      applyFilters();
    });
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      applyFilters();
    });
  });

// Add event listener to the Select All button
selectAllButton.addEventListener("click", () => {
  // Loop through each checkbox and set it to checked
  checkbox.forEach((checkbox) => {
    checkbox.checked = true;
  });
});

  function applyFilters() {
    const activeFilters = document.querySelectorAll('ul li.active');
    const activeCategories = Array.from(activeFilters).map(filter => filter.textContent);
    const checkedBoxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    const checkedCategories = checkedBoxes.map(box => box.value);

   // Get the food types heading and dropdown container
const foodTypes = document.getElementById("foodtypes");
const dropdownContainer = document.querySelector(".dropdown-container");

// Toggle the dropdown menu on click
foodTypes.addEventListener("click", () => {
  dropdownContainer.classList.toggle("open");
});

// Close the dropdown if clicking outside of it
document.addEventListener("click", (event) => {
  if (!dropdownContainer.contains(event.target)) {
    dropdownContainer.classList.remove("open");
  }
});



    // Filter restaurants based on active categories and checked boxes
    const filteredRestaurants = restaurants.filter(restaurant => {
      return activeCategories.includes(restaurant.meal) ||
             activeCategories.includes(restaurant.time) ||
             checkedCategories.includes(restaurant.type);
    });

    // Update the .api section with filtered restaurants
    const apiSection = document.querySelector('.api');
    apiSection.innerHTML = '';
    if (filteredRestaurants.length === 0) {
      apiSection.innerHTML = '<p>No restaurants match the selected criteria.</p>';
    } else {
      filteredRestaurants.forEach(restaurant => {
        const restaurantElement = document.createElement('div');
        restaurantElement.classList.add('restaurant');
        restaurantElement.textContent = restaurant.name;
        apiSection.appendChild(restaurantElement);
      });
      
    }
  }

});
