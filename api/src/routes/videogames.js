const router = require('express').Router();
const { getVideogames, getVideogamesById, postVideogames } = require('../controllers/videoGamesController');

router.get("/", getVideogames);
router.get("/:id", getVideogamesById);
router.post("/create", postVideogames); 

module.exports = router;