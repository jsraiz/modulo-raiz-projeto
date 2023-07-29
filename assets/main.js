import data from './data.js';

import CardCardapio from './components/CardCardapio.js';

import el, { render, Fragment, registerCustomRender } from './lib/dom.js';

import { Roteamento } from './lib/router.js';

const routing = Roteamento();

const $cardapios = document.querySelector('#app');

registerCustomRender({
  type: 'route',

  initialize: ({ defaultRender }) => {
    return {
      onEachRender: (({ node, parentNodeRef }) => {
        routing.addRota(node.attrs?.path, (p) => {
          parentNodeRef.innerHTML = '';
          parentNodeRef.appendChild(defaultRender(
            Fragment(node.attrs, node.childrens, { ref: node.ref })
          ))
        })
        // return defaultRender(Fragment(node.attrs, node.childrens, { ref: node.ref }));
    })
    }
    
  }
})

const Route = (attrs, childrens, extraOptions) => {
  // Precisa add um parentRef para saber onde fazer o render quando tiver updates de rota
  return {
    attrs,
    tagName: null,
    nodeType: 'custom',
    customType: 'route',
    parentRef: null,
    ref: extraOptions.ref,
    childrens: childrens ? childrens : []
  }
}

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

  // console.log('rendeer', el(Fragment, [
  //   el('div.container', [
  //     el(Route, { path: 'cardapios' }, menus.map(CardCardapio))
  //   ])
  // ]))

$cardapios.appendChild(
  render(
    el(Fragment, [
      el('div.container', [
        el(Route, { path: 'cardapios' }, menus.map(CardCardapio)),
        el(Route, { path: 'menus' }, [
          el('div.menus', [
            el('h1', {}, 'Menus')
          ])
        ])
      ])
    ])
  )
);

document.querySelector('#btn_cardapios')
    .addEventListener('click', () => {
      routing.navigate('cardapios')
    })

document.querySelector('#btn_menus')
    .addEventListener('click', () => {
      routing.navigate('menus')
    })