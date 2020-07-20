import React, {useState, useEffect}from 'react';
import Spotify from 'spotify-web-api-js'
import './App.css';

const spotifyWebAPI = new Spotify();


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
  const [nowPlaying, setNowPLaying] = useState("Not Checked")
  const [albumImage, setAlbumImage] = useState()
  const [suggestedAlbums, setAlbums] = useState([])
  const [searchArtist, setArtist] = useState("")

  if (isLoggedIn){
    spotifyWebAPI.setAccessToken(params.access_token)
  }

  function getNowPlaying(){
    spotifyWebAPI.getMyCurrentPlaybackState()
      .then((response) => {
        setNowPLaying(response.item.name)
        setAlbumImage(response.item.album.images[0].url)
      })   
  }

  useEffect(() => {
    
  })
  console.log("this is in the state", suggestedAlbums)
  
  

  function getArtistsArray(){
    var gotAlbums = false
    var queries = 0
    
    if(suggestedAlbums.length == 0){
      spotifyWebAPI.getRecommendations({seed_artists: "4NHQUGzhtTLFvgF5SZesLK", seed_tracks: "0c6xIDDpzE81m2q797ordA", seed_genres: ["jazz"],max_popularity: 10, limit: 20})
        .then((response) => {
          if (suggestedAlbums.length === 0){
          setAlbums(response.tracks)
          queries++
          console.log("this is in the state", suggestedAlbums, queries)
          gotAlbums = true}
        })
      }
    }  

    function handleSubmit(value){
      spotifyWebAPI.search(value, ["artist"], {limit:1})
      .then((response) => {
        console.log(response)
      })
    }
  
  
  return (
    <div className="App">
      <h1>Tiny Spotlight</h1>
      <p className = "statement">In today's musical landscape the competion is ruthless, it's not easy for and indipendent artists to get a chance at recognition and because of that
        there are countless songs that never get the appreciation they deserve. This is a place to try and give these artists some and for the people that are interested in finding them out.
      </p>
      <form  onSubmit = {handleSubmit()}>
        <label>
          Enter an artist name
          <input type="text" name="artist" value = {searchArtist} onChange={e => setArtist(e.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <br />
      <div>
        <a href = 'http://localhost:8888'>
          <button>Log In</button>
        </a>
        <button onClick = {getNowPlaying()}>Check now playing</button>
        <button onClick = {getArtistsArray()}>Test query </button>
        <button>By Mood</button>
        <button>By Similar Artists</button>
      </div>

      <div>
        <i>Recommended Albums based on your suggestions</i>
        {suggestedAlbums.map((track, index) =>
          <div key = {index}>
          <b> {track.name}</b>
          <br/>
          </div>)}

      </div>

      <div>
        Now Playing: {nowPlaying}
        <img src = {albumImage} style = {{width: 100}}/>
      </div>
    </div>
  );

  
}



export default App;

// Resources for queries https://developer.spotify.com/documentation/web-api/reference/search/search/
//https://developer.spotify.com/console/get-search-item/?q=pop&type=artist&market=&limit=&offset=
// to start server => node auth-server/authorization_code/app.js

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
    */
