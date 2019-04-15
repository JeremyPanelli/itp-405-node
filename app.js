let express = require('express');
let knex = require('knex');

let app = express();
//
// app.get('/api/artists', function(request, response){
//   let connection = knex({
//     client: 'sqlite3',
//     connection: {
//       filename: 'chinook.db'
//     }
//   });
//   console.log(request.query);
//   if(request.query.filter != null){
//     connection
//       .select()
//       .from('artists')
//       .where('ArtistId', request.query.filter)
//       .then((artists) => {
//           if(artists){
//             response.json(artists);
//           } else {
//             response.status(404).json({
//               error: 'Artist not found'
//             });
//           }
//       });
//   }
//   else {
//     connection
//       .select()
//       .from('artists')
//       .then((artists) => {
//           if(artists){
//             response.json(artists);
//           } else {
//             response.status(404).json({
//               error: 'Artist not found'
//             });
//           }
//       });
//   }
// });
//


let WebSocket = require('ws');
let wss = new WebSocket.Server({
  port:process.env.PORT || 8080
});
wss.on("connection", function(ws){
  ws.on("message", function(message){
    wss.clients.forEach((client) => {
      client.send(message);
    });
  });
});
