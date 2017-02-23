var express = require('express')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var app = express()


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

	app.get('/api/ping', function (req, res) {
	  res.send('pong')
	})

	app.listen(3000, function () {
	  console.log(`Worker ${process.pid} started`);
	})
}


