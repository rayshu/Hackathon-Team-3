$(function(){

    const deckView = $('#deckView');
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    const fcmngBtn = $('#forthcoming');
    const trendingBtn = $('#trendingBtn');
    fcmngBtn.click(renderForthcoming);
    trendingBtn.click(renderTrending);

    renderTrending();


    function renderForthcoming(){
        deckView.empty();
        $.get('https://api.themoviedb.org/3/movie/upcoming?api_key=0ac129ae7853e557283380b2033a0e36&language=en-US&page=1',function(data){
           
        
            for(let  i=0;i<data.results.length;++i){
                console.log(data.results[i].poster_path);
                let item = data.results[i];
                let card = $(`<div class="col-4 card">
                <img src="`+baseUrl+item.poster_path+`" class="card-img-top" width="500">
                <div class="card-body ">
                  <h4>`+item.title+`</h4>
                  <p>`+item.overview+`</p>
                  <h5> Rating `+item.vote_average+`</h5>
                  <button class="btn btn-dark ">Recommend</button>
                </div>
              </div>`
                    );

                let btn = card.find("button")
                btn.click(function(){
                    recommendMovie(item.id,btn.text(),btn);
                });

                $.get("https://api.themoviedb.org/3/movie/"+item.id+"/account_states?api_key=0ac129ae7853e557283380b2033a0e36&session_id=a33db5be10a9be7f7e914243b5669927af1fa1a4",
                function(data){
                    console.log(data);
                    btn.text(data.favorite?"Unrecommend":"Recommend");
                    deckView.append(card);
                })
            

                
              
            }
        
            })
    }


    function recommendMovie(id,status,btn){
        console.log(id)
        let favStatus = status=="Recommend"?false:true;
        btn.text(favStatus?"Recommend":"Unrecommend")
        $.post( "https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0ac129ae7853e557283380b2033a0e36&session_id=a33db5be10a9be7f7e914243b5669927af1fa1a4",{
            "media_type": "movie",
            "media_id": id,
            "favorite": favStatus
        }, function( data ) {
           console.log(data);
          });
    }

    function checkFavourite(){
        
    }

    function renderRecommendations(){
        deckView.empty();

    }



    function renderTrending(){
        deckView.empty();
        $.get('https://api.themoviedb.org/3/trending/movie/day?api_key=0ac129ae7853e557283380b2033a0e36',function(data){
            console.log(data.results[0]);
        
            for(let  i=0;i<data.results.length;++i){
                console.log(data.results[i].poster_path);
                let item = data.results[i]
                deckView.append(
            
               $(`<div class="col-4 card">
                <img src="`+baseUrl+item.poster_path+`" class="card-img-top" width="500">
                <div class="card-body ">
                  <h4>`+item.title+`</h4>
                  <p>`+item.overview+`</p>
                  <h5> Rating `+item.vote_average+`</h5>
                  <button class="btn btn-dark">Recommend</button>
                </div>
              </div>`
                    )
              )
            }
        
            })
    }


})