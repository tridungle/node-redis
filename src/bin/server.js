import debugLib from 'debug';
import http from 'http';
import redis from 'redis';
import app from '../app';
import config from '../config';
import RedisCache from '../redis'
class Server {
  constructor(app) {
    this.app = app;
    this.debug = debugLib('lear-node-redis:server');
    this.setServerPort();
    this.startServer();
    this.initRedisClient();
  }

  setServerPort = () => {
    this.port = this.normalizePort(config.server.port);
    this.app.set('port', this.port);

  }
  startServer = () => {
    this.server = http.createServer(this.app);
    this.server.listen(this.port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }

  initRedisClient = () => {
    const { port, host, ...options} = config.redis;

    const redisClient = redis.createClient(port, host, options);
    this.app.set('redisClient',redisClient);
    this.cacheAdapter = new RedisCache(redisClient);
  }
  normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  };

  onError = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof this.port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  onListening = () => {
    const addr = this.server.address();
    const bind =
      typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(`Listening on ${bind}`);
    this.debug('Listening on ' + bind);
  }
}

export default new Server(app);