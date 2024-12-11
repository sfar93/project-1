document.addEventListener("DOMContentLoaded", function() {
  const filters = document.querySelectorAll('ul li');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filter.classList.toggle('active');
      applyFilters();
    });
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      applyFilters();
    });
  });

  function applyFilters() {
    const activeFilters = document.querySelectorAll('ul li.active');
    const activeCategories = Array.from(activeFilters).map(filter => filter.textContent);
    const checkedBoxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    const checkedCategories = checkedBoxes.map(box => box.value);

    // Example restaurant data (replace with your actual data)
    const restaurants = [
      { name: "Sunrise Cafe", meal: "Breakfast", time: "Morning", type: "American" },
      { name: "La Fiesta", meal: "Lunch", time: "Afternoon", type: "Mexican" },
      { name: "Evening Bistro", meal: "Dinner", time: "Evening", type: "French" },
      { name: "Late Night Snack", meal: "Snack/Dessert", time: "Late Night", type: "Italian" },
    ];

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
