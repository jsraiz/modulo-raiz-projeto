import data from './data.js';

import CardCardapio from './components/CardCardapio.js';

import el, { render } from './lib/dom.js';

const $cardapios = document.querySelector('#app');

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
    $fragment.appendChild(
      render(CardCardapio(menu))
    )
  })

$cardapios.appendChild($fragment);
