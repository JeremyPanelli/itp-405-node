let express = require('express');
let knex = require('knex');

let app = express();

app.get('/api/artists', function(request, response){
  let connection = knex({
    client: 'sqlite3',
    connection: {
      filename: 'chinook.db'
    }
  });
  console.log(request.query);
  if(request.query.filter != null){
    connection
      .select()
      .from('artists')
      .where('ArtistId', request.query.filter)
      .then((artists) => {
          if(artists){
            response.json(artists);
          } else {
            response.status(404).json({
              error: 'Artist not found'
            });
          }
      });
  }
  else {
    connection
      .select()
      .from('artists')
      .then((artists) => {
          if(artists){
            response.json(artists);
          } else {
            response.status(404).json({
              error: 'Artist not found'
            });
          }
      });
  }
});

app.listen(process.env.PORT || 8000);

const WebSocket = require("ws");

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    wss.clients.forEach(client => {
      client.send(message);
    });
  });
});
