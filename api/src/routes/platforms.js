const router = require('express').Router();
const getPlatforms = require('../controllers/platformsController');

router.get("/", getPlatforms);

module.exports = router;