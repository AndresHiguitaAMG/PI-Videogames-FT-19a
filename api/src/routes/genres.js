const router = require('express').Router();
const getGenres = require('../controllers/genresController');

router.get("/", getGenres);

module.exports = router;