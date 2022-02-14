import React, {useState, useEffect}from 'react';
import Spotify from 'spotify-web-api-js'
import './App.css';
import MainButton from './Components/MainButton'
import Inputs from './Components/Inputs'

const spotifyWebAPI = new Spotify();
 /*
 for next session:

 finish gradient in statement
 refine functionality
 */ 

function App() {

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  const params = getHashParams()

  const [isLoggedIn, setIsLoggedIn] = useState(params.access_token ? true : false)
  const [suggestedAlbums, setAlbums] = useState([])
  const [searchArtist, setArtist] = useState("")
  const [searchSong, setSong] = useState("")
  const [searchGenre, setGenre] = useState("")
  

  if (isLoggedIn){
    spotifyWebAPI.setAccessToken(params.access_token)
  }  

  
  return (
    <div className="App">
      <h1>Tiny Spotlight</h1>
      <p className = "statement">In today's musical landscape the competion is ruthless, it's not easy for and indipendent artists to get a chance at recognition and because of that
        there are countless songs that never get the appreciation they deserve. This is a place to try and give these artists some and for the people that are interested in finding them out.
      </p>

      <Inputs/>
     
      
      <div id = "container">

      <a id="button-1" className="button" href="http://localhost:8888#">Log in!<img id="arrow-hover" src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-paper-plane-1-120.png?raw=true"/></a>
        <MainButton/>
        
      </div>
      {
      <div className = "playlistDiv">
        <i style = {{color: "#BFC0C0", marginBottom: "1vh"}}>Recommended Albums based on your suggestions</i>
        {suggestedAlbums.map((track, index) =>
          <div key = {index} >
          <b style = {{color: "#BFC0C0"}}> {track.name}- {track.artists[0].name}</b>
          <br/>
          </div>)}
        
      </div>
      }
    </div>
  );

  
}



export default App;

// Resources for queries https://developer.spotify.com/documentation/web-api/reference/search/search/
//https://developer.spotify.com/console/get-search-item/?q=pop&type=artist&market=&limit=&offset=
// to start server => node auth-server/authorization_code/app.js

/*
styling list:

Background
buttons
input field
typography

*/

/*
  core functionality pseudo code
  Search low followers count artists based on genre
    var offset = 0

    while (smallArtistsPlaylist[].length < minLength || offset > 1999){
    
      API call(genre, [artist], {offset: offset, limit: 10} )
        .then((response) => {
          for (i =0 ; i <= items.length; i++){
            if(items(i).followers < maxFollowers && items(i).popularity < maxPopularity && items(i).genre == genre){      
              smallArtistsPlaylist[].push(item)
            }
          }
        })
      offset = offset+offset   
    }

    alternative approach => get recommendations based on seed 
    spotifyWebAPI.getRecommendations(options)
*/ 

//small change
    /*
    var offset = 5
    const artistsArray = [] 
    var i 
    const genre = "jazz"
    const maxPopularity = 40
    const maxFollowers = 150

    console.log("started query")

    while( offset < 100){
      console.log("did one search")
      spotifyWebAPI.search(genre, ["artist"], {offset: offset, limit:10})
        .then((response) => {
          var tempArray = response.artists.items
          for (i = 0; i < tempArray.length; i++ ){
            if(tempArray[i].popularity <= maxPopularity){
              artistsArray.push(tempArray[i])
            }
          }
        })
        offset += 5
    }
    console.log("finished searching")
    console.log(artistsArray)

    Basically make a function that take either a song, an artist or a genre as an argument
    and return an array of songs based on the parameters and display them
    */
