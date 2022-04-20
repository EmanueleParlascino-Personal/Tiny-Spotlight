import React, {useState}from 'react';
import Spotify from 'spotify-web-api-js'
import '../App.css';
const spotifyWebAPI = new Spotify();

function MainButton(props){

    const [suggestedAlbums, setAlbums] = useState([])
    const [searchArtist, setArtist] = useState("")
    const [searchSong, setSong] = useState("")
    const [searchGenre, setGenre] = useState("")
    function getArtistsArray(){
        var gotAlbums = false
        var queries = 0
        
        if(suggestedAlbums.length == 0){
          spotifyWebAPI.getRecommendations({ seed_genres: ["rock"], max_popularity: 1, limit: 20})
            .then((response) => {
              if (suggestedAlbums.length === 0){
              setAlbums(response.tracks)
              queries++
              console.log("this is in the state", suggestedAlbums, queries)
              gotAlbums = true}
            })
          }
        console.log("finished array", suggestedAlbums)  
        } 


    return(
      <div style = {{display:"flex"}}>
        <div className="button" id="button-2" onClick = {getArtistsArray()}>
          <div id="slide"></div>
          <a href="#">Get a playlist</a>  
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
    )
}

export default MainButton