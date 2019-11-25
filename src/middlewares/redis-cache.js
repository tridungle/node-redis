class RedisCacheMiddleware {
  checkRedisCache = (req, res, next) => {
    const { id } = req.params;
    const redisClient = req.app.get('redisClient');
    if (!redisClient) {
      next();
    }
    redisClient.get(id, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      if (data != null) {
        console.log('load data from cache')
        res.send(data);
      } else {
        next();
      }
    });
  };
}
export default new RedisCacheMiddleware();