import http from 'http';

const server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-type': 'text/html',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*' 
  });

  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>JS Raiz</title>
    </head>
    <body>
      <h1>Olá raizeros!!!</h1>
    </body>
    </html>
  `);
  res.end();
});

server.listen(9000, function(err) {
  if (err) {
    console.error(err);
  }

  console.log('Servidor rodando na porta 9000');
});