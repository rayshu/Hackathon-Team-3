const router = require('express').Router();
const movieDbApi = require('../../movieDBApi');

const users=[];

router.get('/login',movieDbApi.getRequestToken);

router.get('/login/callback',movieDbApi.getSessionId);



module.exports = router;