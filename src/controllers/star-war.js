import axios from 'axios';
import EventEmitter from 'events';

class StarWarController extends EventEmitter {
  constructor() {
    super()
  }
  fetchStarship = async (req, res) => {
    try {
      const { id } = req.params;
      const starShipInfo = await axios.get(
        `https://swapi.co/api/starships/${id}`
      );
      //get data from response
      const starShipInfoData = starShipInfo.data;
      // Since Redis stores data in key value pairs, we need to make sure that whenever a request is made to the Star Wars API
      // and we receive a successful response, we store the Starship id paired with its data in our cache.
      this.emit('CACHE_STAR_SHIP_DATA', { id, starShipInfoData });
      return res.json(starShipInfoData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
}

export default new StarWarController();
