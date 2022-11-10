import React, {useState}from 'react';
import MainButton from './MainButton'
import '../App.css';


function Inputs(){
    const [searchArtist, setArtist] = useState("")            
    const [searchSong, setSong] = useState("")
    const [searchGenre, setGenre] = useState("")

    return(
        <div className='formContainer'>
            <div className="form__group">
                <label className="form__label">
                    Artist
                </label>
                <input type="text" className="form__field" name="artist" value = {searchArtist} onChange={e => setArtist(e.target.value)} onClick = {() =>{}} />
            </div> 
            <div className="form__group"> 
                <label className="form__label">
                    Song
                </label>   
                <input type="text" name="artist" className="form__field" value = {searchSong} onChange={e => setSong(e.target.value)}/>
            </div>
            <div className="form__group">
                <label className="form__label">
                    Genre
                </label>   
                <input type="text" name="artist" className="form__field" value = {searchGenre} onChange={e => setGenre(e.target.value)}/>
            </div>
            <MainButton artist = {searchArtist} track= {searchSong} genre = {searchGenre}/>
        </div>
    
    )
}

export default Inputs