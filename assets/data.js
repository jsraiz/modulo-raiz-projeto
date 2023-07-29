import data from './restaurants.js';

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
console.log('newData', newData)

export default {
  restaurants,
  menus,
};
