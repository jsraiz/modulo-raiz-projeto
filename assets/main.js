import data from './data.js';

function isChildren (childrens) {
  return Array.isArray(childrens) || typeof childrens === 'string'
}

const isString = value => typeof value === 'string';

const toArray = value => Array.isArray(value) ? value : [value];

function normalizeChildrens (childrens) {
  if (isString(childrens)) {
    return document.createTextNode(childrens)
  }

  if (Array.isArray(childrens)) {
    return childrens.map($children => (
      isString($children)
        ? document.createTextNode($children)
        : $children
    ))
  }

  return childrens;
}

function extractTagName (tagName) {
  return tagName.match(/^\w+/)[0];
}

function extractClassesAndId (tagName) {
  // div#card.card.cardapio
  const regexp = /[\#\.]{1}([\w\-\_]*)/gi;
  
  return Array.from(tagName.matchAll(regexp))
    .reduce(function(acc, current) {
      if (current[0].startsWith('.')) {
        acc.classes.push(current[1]);
      } else {
        acc.id.push(current[1]);
      }

      return acc;
    }, { classes: [], id: [] });
}

function el(tagName, attrsArr, childrensArr) {
  /**
   * Se o segundo argumento (attrs) for um array, significa que não temos atributos
   * Se o segundo argumento (attrs) for uma string, significa que não temos atributos
   * Os filhos podem ser ou array ou string
   * Se o segundo argumento for um objeto, significa que temos atributos
  */

  const $el = document.createElement(extractTagName(tagName));

  const { classes, id } = extractClassesAndId(tagName);

  if (id.length) {
    $el.id = id.pop();
  }

  if (classes.length) {
    $el.classList.add(...classes);
  }

  const childrens = ( isChildren(attrsArr) ) ? attrsArr : childrensArr;

  const attrs = !isChildren(attrsArr) ? attrsArr : {};

  Object.entries(attrs).forEach(function([ key, value ]) {
    $el.setAttribute(key, value);
  })

  const $childrens = normalizeChildrens(childrens);

  toArray($childrens)
    .forEach(($children) => {
      $el.appendChild($children);
    })

  return $el;
}

function tplCardapio(menu) {
  return el('div#card.card.cardapio', [
    el('header.card-header', [
      el('h3.card-title', { style: 'color: red' }, `${menu.title} - ${menu.restaurant.name}`)
    ]),
    el('div#cardBody.card-body', [
      el('ul', menu.sections.map(function(section) {
        return el('li', section.title)
      }))
    ])
  ]);
  // const $cardapio = document.createElement('div');
  // $cardapio.classList.add('cardapio');

  // const $header = document.createElement('header');

  // const $h3 = document.createElement('h3');
  // $h3.textContent = `${menu.title} - ${menu.restaurant.name}`;

  // $h3.setAttribute('style', 'color: red');

  // $header.appendChild($h3);

  // $cardapio.appendChild($header);

  // const $cardapioBody = document.createElement('div');
  // $cardapioBody.classList.add('cardapio-body');

  // const $ul = document.createElement('ul');

  // for (let section of menu.sections) {
  //   const $li = document.createElement('li');
  //   $li.textContent = section.title;
  //   $ul.appendChild($li);
  // }

  // $cardapioBody.appendChild($ul);

  // $cardapio.appendChild($cardapioBody);

  // return $cardapio;
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

