import { StarWarController } from '../controllers';

class RedisCache {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.listenCacheEvent();

  }
  listenCacheEvent = () => {
    StarWarController.on('CACHE_STAR_SHIP_DATA', data =>{
      this.setStartShipCache(data)
    }
    );
  };
  setStartShipCache = data => {
    this.redisClient.setex(
      data.id,
      3600,
      JSON.stringify(data.starShipInfoData)
    );
  };
}

export default RedisCache;
