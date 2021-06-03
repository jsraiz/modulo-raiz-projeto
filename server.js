import http from 'http';
import fs from 'fs';

import data from './assets/data.js';

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
  
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JS Raiz</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        ${Array.from(data.menus.values()).slice(0, 3).map(function(menu) {
          return `
            <div class="cardapio">
              <header>
                <h3>${menu.title} - ${data.restaurants.get(menu.restaurantId).name}</h3>
              </header>
              <div class="cardapio-body">
                <ul>
                  ${menu.sections.map(function(section) {
                    return `
                      <li>${section.title}</li>
                    `
                  }).join('')}
                </ul>
              </div>
            </div>
          `
        }).join('')}
        <script type="module" src="main.js"></script>
      </body>
      </html>
    `);
    res.end();
  }
});

server.listen(9000, function(err) {
  if (err) {
    console.error(err);
  }

  console.log('Servidor rodando na porta 9000');
});