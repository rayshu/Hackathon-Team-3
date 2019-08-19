const router = require('express').Router();
const movieDbApi = require('../../movieDBApi');


router.get('/trending',movieDbApi.trendingMovies)

module.exports = router;