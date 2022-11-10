import React, {useState}from 'react';
import Spotify from 'spotify-web-api-js'
import '../App.css';
const spotifyWebAPI = new Spotify();

function MainButton(props){

    const [suggestedAlbums, setAlbums] = useState([])
    
    async function getArtistsArray(){
      if(props.genre !== ""){
        spotifyWebAPI.getRecommendations({ seed_genres: [props.genre], max_popularity: 10, limit: 20})
        .then((response) => setAlbums(response.tracks))
      }
      else if(props.track !== ""){
        let trackId = await spotifyWebAPI.searchTracks(props.track).then(response => response.tracks.items[0].id)

        console.log(props.track)
        spotifyWebAPI.getRecommendations({ seed_tracks:[ trackId], max_popularity: 10, limit: 20})
          .then((response) => setAlbums(response.tracks))
      }
      else if(props.artist !== ""){
        let artistId = await spotifyWebAPI.searchArtists(props.artist).then(response => response.artists.items[0].id)

        spotifyWebAPI.getRecommendations({seed_artists: [artistId], max_popularity: 10, limit: 20})
        .then((response) => setAlbums(response.tracks))
      }

    } 

    return(
      <div className='second-half'>
        <div className="button" id="button-2" onClick = {getArtistsArray}>
          <div id="slide"></div>
          <a href="#a">Get a playlist</a>  
        </div>
        {
          suggestedAlbums.length > 0?
          <div className = "playlistDiv">
            <h4>Recommended Songs based on your suggestions</h4>
            {suggestedAlbums.map((track, index) =>
              <div key = {index} >
                <iframe  src = {`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`} width="100%" height="100" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ></iframe>
              <br/>
              </div>)}
          </div>:null
        }
      </div>  
    )
}

export default MainButton