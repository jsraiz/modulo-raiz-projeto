import data from './data.js';

import CardCardapio from './components/CardCardapio.js';

const $cardapios = document.querySelector('.cardapios');

const $fragment = document.createDocumentFragment();

Array.from(data.menus.values())
  .slice(3)
  .map(function(menu) {
    return {
      ...menu,
      restaurant: {
        name: data.restaurants.get(menu.restaurantId).name
      }
    }
  })
  .forEach(function(menu) {
    console.log(JSON.stringify(CardCardapio(menu)));
    // $fragment.appendChild(CardCardapio(menu))
  })

// $cardapios.appendChild($fragment);

