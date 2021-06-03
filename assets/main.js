import data from './data.js';

function tplCardapio(menu) {
  return `
    <div class="cardapio">
      <header>
        <h3 style="color: red">${menu.title} - ${menu.restaurant.name}</h3>
      </header>
      <div class="cardapio-body">
        <ul>
          ${menu.sections.map(function(section) {
            return `<li>${section.title}</li>`;
          }).join('')}
        </ul>
      </div>
    </div>
  `
};

const tplCardapios = Array.from(data.menus.values())
  .slice(3)
  .map(function(menu) {
    return {
      ...menu,
      restaurant: {
        name: data.restaurants.get(menu.restaurantId).name
      }
    }
  })
  .map(function(menu) {
    return tplCardapio(menu);
  })
  .join('');

const $cardapios = document.querySelector('.cardapios');

$cardapios.insertAdjacentHTML('beforeend', tplCardapios);