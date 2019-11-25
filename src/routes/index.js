import express from 'express';
var app = express.Router();
import { StarWarController } from '../controllers';
import {RedisCacheMiddleware} from '../middlewares';

app.get('/', function(req, res, next) {
  res.json({ title: 'Hello World!' });
});

app.get('/starships/:id',RedisCacheMiddleware.checkRedisCache, StarWarController.fetchStarship);

export default app;
