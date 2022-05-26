import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import Player from "./components/player";
import Footer from "./components/footer";
import ClipLoader, {override} from "react-spinners/ClipLoader";

function App() {
  const [userName, setUserName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);
  const [summonerData, setSummonerData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, []);


  function handleChange(event){
    const {value} = event.target;
    setSearchText(value);
  }
  function getPlayerGames(){
    axios.get(`https://league-matches-history.herokuapp.com/${searchText}`)
      .then(response => {
        setGameList(response.data);
        setUserName(searchText);
      })
      .catch(error => { 
        console.error(error) 
      });
      axios.get(`https://league-matches-history.herokuapp.com/${searchText}`)
      .then(response => { 
        setSummonerData(response.data);
      })
      .catch(error => { 
        return error;
      });
  }
  function lookPlayerUp(summonerName){
    axios.get(`https://league-matches-history.herokuapp.com/${summonerName}`)
      .then(response => {
        setGameList(response.data);
        setUserName(summonerName);
      })
      .catch(error => { 
        console.error(error) 
      });
    axios.get(`https://league-matches-history.herokuapp.com/${summonerName}`)
      .then(response => { 
        setSummonerData(response.data);
      })
      .catch(error => { 
        return error;
      });
  }

   console.log(gameList); 

  return (
    <div className="App">
    {
      loading ? 
      <><h1>Loading</h1><ClipLoader color={"#36A4D7"} loading={loading} css={override} size={600} /></>
      :
      <>
      <h1 className = "intro-header">Welcome to League Match Look Up App</h1>
      
      <div class="input-group">
      <div class="input-group mb-3">
  <input onChange = {handleChange} type="text" class="form-control" placeholder="Summoner Name" aria-label="Summoner username" aria-describedby="basic-addon2"/>
  <div class="input-group-append">
    <button onClick = {getPlayerGames} class="btn btn-primary" type="button">Get Past 5 Games</button>
    <p><strong>Note</strong>: May experience slight delay between input and fetching data from the Riot Games API.</p>
  </div>
</div>
</div>
  <div className = "league-img"></div>
      {gameList.length ? 
        <>
        <h1 className = "summoner-header">Summoner: <strong>{userName}'s</strong> Match History</h1>
        <div className ="player-profile">
        <p><strong>Summoner Name: </strong>{summonerData.name}</p>
        <p><strong>Summoner Level: </strong>{summonerData.summonerLevel}</p>
        <img width = "200" height = "200" src ={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${summonerData.profileIconId}.png`} alt = "profile-img"></img>
        </div>
        {gameList.map((gameData, index) => {
          return <div>
          <h2 class = "game-heading">  Game {index + 1}, Duration: {(gameData.info.gameDuration-(gameData.info.gameDuration%=60))/60+(9<gameData.info.gameDuration?':':':0')+gameData.info.gameDuration
          } Minutes </h2>
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
      </>
    }

      </div>
  );
}

export default App;
