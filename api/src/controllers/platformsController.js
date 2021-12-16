const axios = require('axios');
const { API_KEY } = process.env;

const getPlatforms = async (req, res, next) => {
    try {
        const responsePlatforms = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        const namePlatform = responsePlatforms.data.results.map(el => el.name)
        return res.json(namePlatform); 
    } catch (error) {
        next(error);
    }
}

module.exports = getPlatforms;