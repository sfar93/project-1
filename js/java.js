// const RAPID_API_KEY = '9a8665d796mshf47bbffaf7306a1p118883jsn7efa357f83ed'
const RAPID_API_KEY = '1456abf87cmshfa52d039b76b2a2p1c6c6bjsneec8df59ca1b'

// const getData = async () => {
//   const url = 'https://tripadvisor-scraper.p.rapidapi.com/restaurants/list?query=salt%20lake%20city&page=1';
//   const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': RAPID_API_KEY,
//       'x-rapidapi-host': 'tripadvisor-scraper.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();

//     const detailedRestaurantsInfo = [];

//     for (let i = 0; i < result.results.length; i++) {
//       const url = `https://tripadvisor-scraper.p.rapidapi.com/restaurants/detail?id=${result.results[i].id}`;
//       const options = {
//         method: 'GET',
//         headers: {
//           'x-rapidapi-key': RAPID_API_KEY,
//           'x-rapidapi-host': 'tripadvisor-scraper.p.rapidapi.com'
//         }
//       };

//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         detailedRestaurantsInfo.push(result)


//       } catch (error) {
//         console.error(error);
//       }

//     }

//     localStorage.setItem("restaurants", JSON.stringify(detailedRestaurantsInfo));
//     console.log(detailedRestaurantsInfo)

//     return result.results
//   } catch (error) {
//     console.error(error);
//   }
// }


document.addEventListener("DOMContentLoaded", async function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectAllButton = document.getElementById('select-all');
  const clearAllButton = document.getElementById('clear-all');
  const api = document.querySelector('.api');
  

  let selectedFoodTypes = [];
  let selectedMealTypes = [];
  //let addressType =[];

  // const restaurants = await getData();

  const applyFoodTypeFilter = () => {
    console.log(restaurants)

    const filteredRestaurants = restaurants.filter(restaurant => {

      let hasType = restaurant.cuisines.some(cuisine => selectedFoodTypes.includes(cuisine)) ||
          restaurant.meal_types.some(meal_type => selectedMealTypes.includes(meal_type));
          //restaurant.address.some(address => address.includes(address));
      return hasType;
    })
    console.log(filteredRestaurants);
    
    renderRestaurants(filteredRestaurants);
    
  }


  const applyFilters = () => {

  }

  selectAllButton.addEventListener('click', () => {
    //const selectAllChecked = selectAllButton.checked;
    checkboxes.forEach(checkbox => checkbox.checked = true);
    //applyFilters();
    renderRestaurants(restaurants);
    return;
  });

  clearAllButton.addEventListener('click', () => {
    //const selectAllChecked = selectAllButton.checked;
    checkboxes.forEach(checkbox => checkbox.checked = false);
    //applyFilters();
    renderRestaurants ([]);
    return;
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      // Uncheck the "Select All" button if any checkbox is unchecked

      if (!checkbox.checked) {
        selectAllButton.checked = false;
        
        if (event.target.name == "food") {
          selectedFoodTypes = selectedFoodTypes.filter(function (item) {
            return item !== event.target.value
          })
          applyFoodTypeFilter()
        }else if (event.target.name == "mealtype"){
          selectedMealTypes = selectedMealTypes.filter(function (item){
            return item !== event.target.value
          })
          applyFoodTypeFilter()
        
        }
      } else {
        if (event.target.name == "food") {
          selectedFoodTypes.push(event.target.value);
          applyFoodTypeFilter()

        }else if (event.target.name == "mealtype") {
          selectedMealTypes.push(event.target.value);
          applyFoodTypeFilter()
          return
    }
  }
      
    });
    
   

  });
  function renderRestaurants (restaurants) {
       
    api.innerHTML = '';
    for (let i = 0; i < restaurants.length; i++){
      const restaurant = restaurants[i];
      
      const parentDiv = document.createElement ('div');
      parentDiv.classList.add('card-parent');

      const art = document.createElement('p');
      art.classList.add('restaurant-name');
      art.textContent = restaurant.name;
      parentDiv.appendChild(art);
      
      const addi = document.createElement('p');
      addi.classList.add('restaurant-address');
      addi.textContent = restaurant.address;
      parentDiv.appendChild(addi);
      api.appendChild(parentDiv);

      const contact = document.createElement('p');
      contact.classList.add('restaurant-phone');
      contact.textContent = restaurant.phone;
      parentDiv.appendChild(contact);
      api.appendChild(parentDiv);

      const web = document.createElement('a');
      web.classList.add('restaurant-website');
      web.href = restaurant.website;
      web.textContent = restaurant.website;
      web.target = '_blank';
      parentDiv.appendChild(web);
      api.appendChild(parentDiv);

      const stars = document.createElement('p');
      stars.classList.add('restaurant-rating');
      stars.textContent = restaurant.rating;
      parentDiv.appendChild(stars);
      api.appendChild(parentDiv);
      
      
    }
    api.style.display='flex';
    api.style.flexDirection = 'row';
    api.style.flexWrap = 'wrap';
    api.style.textWrap = 'wrap';
    

  }

});



