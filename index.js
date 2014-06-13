var Primus = require('primus');
var http = require('http');
var path = require('path');
var fs = require('fs');

/**
 * Create HTTP server and serve index.html.
 */

var server = http.createServer(function incoming(req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
});

/**
 * Initialize primus.
 */

var primus = new Primus(server);

/**
 * Echo a message when we receive it.
 */

primus.on('connection', function connection(spark) {
  console.log('A new client is connected (id: %s)', spark.id);
  spark.on('data', function received(data) {
    console.log('New message from client (id: %s):', spark.id, data);
    spark.write(data);
  });
});

primus.on('disconnection', function disconnection(spark) {
  console.log('Client (id: %s) is disconnected', spark.id);
});

/**
 * Broadcast a greeting message when we receive the signal SIGUSR1.
 */

process.on('SIGUSR2', function broadcastHello() {
  console.log('Broadcast hello to all clients');
  primus.write('Hello world!');
});

/**
 * Listen.
 */

server.listen(process.env.PORT || 3000);
server.once('listening', function logPort() {
  console.log('Server started', server.address().port);
  console.log('-> http://localhost:%d/', server.address().port);
  console.log('-> kill -s SIGUSR2 %d', process.pid);
});