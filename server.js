import http from 'http';

const server = http.createServer(function(req, res) {
  console.log(req.url);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*'); 

  if (req.url === '/main.js') {
    res.writeHead(200, {
      'Content-type': 'text/javascript'
    });
    res.write(`
      function soma(a, b) {
        return a + b;
      }
      console.log('Oi galera!', soma(10, 5));
    `);
  } else if (req.url === '/style.css') {
    res.writeHead(200, {
      'Content-type': 'text/css',
    });
    res.write(`
      h1 { color: red; }
    `);
  } else {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })
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
        <h1>Olá raizeros!!!</h1>
        <script src="main.js"></script>
      </body>
      </html>
    `);
  }
  res.end();
});

server.listen(9000, function(err) {
  if (err) {
    console.error(err);
  }

  console.log('Servidor rodando na porta 9000');
});