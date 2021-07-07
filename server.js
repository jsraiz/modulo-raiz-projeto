import http from 'http';
import fs from 'fs';

import data from './assets/data.js';

import ejs from 'ejs';

import CardCardapio from './assets/components/CardCardapio.js';

import el, { renderServer, Fragment } from './assets/lib/dom.js';

const server = http.createServer(function (req, res) {
  console.log(req.url);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');

  if (req.url.match(/\.js$/)) {
    const fileStream = fs.createReadStream(`./assets${req.url}`);
    res.writeHead(200, {
      'Content-type': 'text/javascript'
    });
    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    /**
     * 
     */

    const menus = Array.from(data.menus.values())
      .slice(0, 3)
      .map(function(menu) {
        return {
          ...menu,
          restaurant: {
            name: data.restaurants.get(menu.restaurantId).name
          }
        }
      });


    const dataTpl = {
      App() {
        return renderServer(el(Fragment, menus.map(CardCardapio)))
      } 
    };
  
    ejs.renderFile('./templates/index.ejs', dataTpl, function(err, str){
      if (err) {
        console.error(err);
      }

      res.write(str);
      res.end();
    });
  }
});

server.listen(9000, function(err) {
  if (err) {
    console.error(err);
  }

  console.log('Servidor rodando na porta 9000');
});