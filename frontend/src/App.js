import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState} from "react";
import axios from 'axios';
import Player from "./components/player";
import Footer from "./components/footer"


function App() {
  const [userName, setUserName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);


  function handleChange(event){
    const {value} = event.target;
    setSearchText(value);
  }
  function getPlayerGames(){
    axios.get(`http://localhost:5000/past5games/${searchText}`)
      .then(response => {
        setGameList(response.data);
        setUserName(searchText);
      })
      .catch(error => { 
        console.error(error) 
      });
  }
  function lookPlayerUp(summonerName){
    axios.get(`http://localhost:5000/past5games/${summonerName}`)
      .then(response => {
        setGameList(response.data);
        setSearchText(summonerName);
        setUserName(summonerName);
      })
      .catch(error => { 
        console.error(error) 
      });
  }

   console.log(gameList); 

  return (
    <div className="App">
      <h1 className = "intro-header">Welcome to League Match Look Up App</h1>
      
      <div class="input-group">
      <div class="input-group mb-3">
  <input onChange = {handleChange} type="text" class="form-control" placeholder="Summoner Name" aria-label="Summoner username" aria-describedby="basic-addon2"/>
  <div class="input-group-append">
    <button onClick = {getPlayerGames} class="btn btn-primary" type="button">Get Past 5 Games</button>
  </div>
</div>
</div>
  <div className = "league-img"></div>
      {gameList.length ? 
        <>
        <h1 className = "summoner-header">Summoner: <strong>{userName}'s</strong> Match History</h1>
        {gameList.map((gameData, index) => {
          return <div>
          <h2 class = "game-heading">  Game {index + 1} </h2>
          <div className="player-container">
              {gameData.info.participants.map((data, participantIndex) => {
                // eslint-disable-next-line no-lone-blocks
                {/* return  <div><p>Player {participantIndex + 1}: {data.summonerName}, K/D/A: {data.kills} / {data.deaths} / {data.assists}</p>
                <h1>Champion: {data.championName}</h1> <img src = {`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${data.championName}.png`} alt = "Champion-Splash-Img"></img>
                <h3>Lane: {data.lane}</h3>
                </div> */}
                return <Player handleClick = {lookPlayerUp} props = {data} key = {participantIndex} playerNumber = {participantIndex}/>
              })}
            </div>
            </div>
        })}
        </>
        :
        <>
          <h1 >We Currently Have No Data, Please Enter a Summoner Name.</h1>
        </>
      }
      <Footer />
      </div>
  );
}

export default App;