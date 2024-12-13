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

  let selectedFoodTypes = [];

  // const restaurants = await getData();

  const applyFoodTypeFilter = () => {
    console.log(restaurants)
    const filteredRestaurants = restaurants.filter(restaurant => {
      const hasType = restaurant.cuisines.some(cuisine => selectedFoodTypes.includes(cuisine));
      return hasType;
    })
    console.log(filteredRestaurants)
  }


  const applyFilters = () => {

  }

  selectAllButton.addEventListener('click', () => {
    //const selectAllChecked = selectAllButton.checked;
    checkboxes.forEach(checkbox => checkbox.checked = true);
    applyFilters();
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
        }
      } else {
        if (event.target.name == "food") {
          selectedFoodTypes.push(event.target.value);
          applyFoodTypeFilter()
        }
      }


    });
  });


});
