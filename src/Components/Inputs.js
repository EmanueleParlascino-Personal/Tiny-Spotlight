import React, {useState}from 'react';
import Spotify from 'spotify-web-api-js'
import '../App.css';
const spotifyWebAPI = new Spotify();

function Inputs(props){

    const [suggestedAlbums, setAlbums] = useState([])
    const [searchArtist, setArtist] = useState("")              //To become props
    const [searchSong, setSong] = useState("")
    const [searchGenre, setGenre] = useState("")

    function getArtist(name){
        spotifyWebAPI.search(name, ["artist"], {limit:1})
          .then((response) => {
            console.log("searched artist", response)
          })
      }

    return(
        <div style = {{marginLeft: '42%'}}>
            <div className="form__group field">
        
            <input type="text" className="form__field" name="artist" value = {searchArtist} onChange={e => setArtist(e.target.value)} onClick = {() =>{}} />
            <label className="form__label">
            Artist
            </label>
            <button id="button-1" className="button" onClick = {getArtist(searchArtist)} text = "search"/> 
            </div> 
            <div className="form__group field"> 
                <label className="form__label">
                Song
                </label>   
                <input type="text" name="artist" className="form__field" value = {searchSong} onChange={e => setSong(e.target.value)}/>
            </div>

            <div className="form__group field">
                <label className="form__label">
                Genre
                </label>   
                <input type="text" name="artist" className="form__field" value = {searchGenre} onChange={e => setGenre(e.target.value)}/>
            </div>
        </div>
    
    )
}

export default Inputs