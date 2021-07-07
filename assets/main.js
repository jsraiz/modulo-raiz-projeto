import data from './data.js';

import CardCardapio from './components/CardCardapio.js';

import el, { render, Fragment } from './lib/dom.js';

const $cardapios = document.querySelector('#app');

const menus = Array.from(data.menus.values())
  .slice(3)
  .map(function(menu) {
    return {
      ...menu,
      restaurant: {
        name: data.restaurants.get(menu.restaurantId).name
      }
    }
  });



$cardapios.appendChild(
  render(
    el(Fragment, menus.map(CardCardapio))
  )
);
