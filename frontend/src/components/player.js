import axios from "axios";
import React, { useState, useEffect } from "react";



function Player(props){
    const [champMasteryInfo, setChampMasteryInfo] = useState({});
    const { props: {kills, deaths, assists, summonerName, championName, lane, championId, summonerId, teamId, item0, item1, item2, item3, item4, item5 }} = props;
    

    function getChampMastery(){
        axios.get(`https://league-matches-history.herokuapp.com/champmastery/${summonerId}/${championId}`)
            .then(response => { setChampMasteryInfo(response.data) })
            .catch( error => { return error });
    }

    useEffect( () => {
        getChampMastery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // const API_CALL = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`;

    // axios.get(API_CALL)
    // .then((response) => {
    //     //console.log(response.data);
    //     setChampMasteryInfo(response.data);
    // })
    // .catch(error => { return error; });

    const KDA = deaths === 0 ? ((kills + assists)/1).toFixed(2) : ((kills + assists)/deaths).toFixed(2);
    function handleClick(event){
        event.preventDefault();
        props.handleClick(summonerName);
    }
// const [playerInfo, setPlayerInfo] = useState({});
// useEffect(() => {setPlayerInfo(props)}, 
//     [props]);
// console.log(playerInfo);
return (<div className = {`${teamId === 100 ? "Player Player-Blue" : "Player Player-Red" }`} >
            <p>Player {props.playerNumber + 1}: <strong>{summonerName}</strong> </p>
            <p>K/D/A:  <strong>{kills}/{deaths}/{assists}</strong>  (<strong>{KDA}</strong> KDA)</p>
            <h1>Champion: {championName !== "MonkeyKing" ? championName : "Wukong" } </h1> 
            <h3>Mastery Level: {champMasteryInfo.championLevel || "N/A"} </h3>
            <h3>Champion Mastery Points: {champMasteryInfo.championPoints || "N/A"}</h3>
            <img src = {`http://ddragon.leagueoflegends.com/cdn/12.9.1/img/champion/${championName}.png`} alt = "Champion-Splash-Img"></img>
            <div class="row">
                <p><strong> Items Built: </strong></p>
                <div class="col-2"><img className = "item-img" src = {`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${item0}.png`} alt = "item-img"></img></div>
                <div class="col-2"><img className = "item-img" src = {`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${item1}.png`} alt = "item-img"></img></div>
                <div class="col-2"><img className = "item-img" src = {`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${item2}.png`} alt = "item-img"></img></div>
                <div class="col-2"><img className = "item-img" src = {`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${item3}.png`} alt = "item-img"></img></div>
                <div class="col-2"><img className = "item-img" src = {`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${item4}.png`} alt = "item-img"></img></div>
                <div class="col-2"><img className = "item-img" src = {`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${item5}.png`} alt = "item-img"></img></div>
            </div>
            <h3>Lane: {lane}</h3>
            <button className = "btn btn-primary" onClick = {handleClick}> Look Up Player: {summonerName} </button>
        </div>);
}

export default Player;