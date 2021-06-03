import data from './data.js';

function tplCardapio(menu) {
  // return `
  //   <div class="cardapio">
  //     <header>
  //       <h3 style="color: red">${menu.title} - ${menu.restaurant.name}</h3>
  //     </header>
  //     <div class="cardapio-body">
  //       <ul>
  //         ${menu.sections.map(function(section) {
  //           return `<li>${section.title}</li>`;
  //         }).join('')}
  //       </ul>
  //     </div>
  //   </div>
  // `

  const $cardapio = document.createElement('div');
  $cardapio.classList.add('cardapio');

  const $header = document.createElement('header');

  const $h3 = document.createElement('h3');
  $h3.textContent = `${menu.title} - ${menu.restaurant.name}`;

  $h3.setAttribute('style', 'color: red');

  $header.appendChild($h3);

  $cardapio.appendChild($header);

  const $cardapioBody = document.createElement('div');
  $cardapioBody.classList.add('cardapio-body');

  const $ul = document.createElement('ul');

  for (let section of menu.sections) {
    const $li = document.createElement('li');
    $li.textContent = section.title;
    $ul.appendChild($li);
  }

  $cardapioBody.appendChild($ul);

  $cardapio.appendChild($cardapioBody);

  return $cardapio;
};

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
    $fragment.appendChild(tplCardapio(menu))
  })

$cardapios.appendChild($fragment);

