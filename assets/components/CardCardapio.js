import el from '../lib/dom.js';

export default function CardCardapio(menu) {
  return el('div#card.card.cardapio', [
    el('header.card-header', [
      el('h3.card-title', { style: 'color: green' }, `${menu.title} - ${menu.restaurant.name}`)
    ]),
    el('div#cardBody.card-body', [
      el('ul', menu.sections.map(function(section) {
        return el('li', section.title)
      }))
    ])
  ]);
};