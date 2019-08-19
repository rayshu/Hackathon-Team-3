let config;
try {
  config = require('./secrets.json');
} catch (e) {
  console.error('Create your secrets.json file');
 
}
const mdb = require('moviedb-promise');
const tmdbApi = new mdb(config.tmdbApiKey);
const url = config.url;
const axios = require('axios');
const keyQuery = '?api_key=' + config.tmdbApiKey;


function getRequestToken(req,res,next){

    tmdbApi.requestToken().then(token=>{
        // console.log(token);

        res.redirect('https://www.themoviedb.org/authenticate/' + token.request_token  +
        '?redirect_to=http://localhost:3000/api/users/login/callback?request_token='+ token.request_token);

    }).catch(err=>{
        console.log(err);
    })

}; 

function getSessionId(req,res,next){
    // console.log(req.query.request_token);
    tmdbApi.session().then(session_id=>{
        console.log(session_id);
        res.cookie('session_id', session_id, {
            maxAge: 3600000
        });
        res.redirect('/');
    }).catch(err=>{
        console.log(err);
    })
}

function trendingMovies(req,res,next){
    axios.get(url+'/trending/movie/day'+keyQuery).then((response)=>{
        res.send(response.data);
    })
}


module.exports = {
    getRequestToken,
    getSessionId,
    trendingMovies
}