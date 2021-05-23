import data from '/restaurants.js';

// Colocar como chave um identificador para acesso rápido
// Desaninhar a estrutura

// new Map([
//   ['chave', 'valor'],
//   ['chave', 'valor'],
//   ['chave', 'valor'],
//   ['chave', 'valor'],
// ])

const newData = data.reduce((acc, { menus, ...restaurant }) => ({
  ...acc,
  restaurants: [ 
    ...acc.restaurants, 
    [ 
      restaurant.id, {...restaurant, menus: menus.map(menu => menu.id )}
    ]
  ],
  menus: [ 
    ...acc.menus, 
    ...menus.map(menu => [ menu.id, { ...menu, restaurantId: restaurant.id } 
    ])
  ]
}), { restaurants: [], menus: [] });

const restaurants = new Map(newData.restaurants);
const menus = new Map(newData.menus);
console.log(menus);

// const restaurants = new Map(
//   data.map(function({ menus, ...restaurant }) {
//     return [ restaurant.id, { ...restaurant, menus: menus.map(menu => menu.id) } ]
//   })
// );

// const menus = new Map(
//   data.flatMap(function(restaurant) {
//     return restaurant.menus.map(function(menu) {
//       return [ menu.id, { ...menu, restaurantId: restaurant.id } ]
//     })
//   })
// )

// const restaurantId = menus.get('17e54ee5-bf49-4e06-8309-c62e5f338025').restaurantId;

// console.log(restaurants.get(restaurantId));

//console.log(restaurants.get('c4be049e-1eb6-430e-9917-c1dc5c97a9ed'));
