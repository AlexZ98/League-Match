require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(path.join(__dirname, '/frontend/build'));
console.log(path.join(__dirname, '/frontend/build/index.html'));



app.use(express.static(path.join(__dirname, 'frontend', 'build')));



var app = express();

app.use(cors());

const API_KEY = process.env.RIOT_API_KEY;

function getPlayerPUUID(playerName){
    return axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${API_KEY}`)
        .then(response => {
             console.log(response.data);
            return response.data.puuid;
        })
        .catch(error => {
            console.error(error);
        });
}

app.get("/champmastery/:summonerId/:championId", async (req, res) => {
    const API_CALL = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.params.summonerId}/by-champion/${req.params.championId}?api_key=${API_KEY}`;
    const masteryData = await axios.get(API_CALL)
        .then( response => { return response.data; })
        .catch(error => { return error; });
    res.json(masteryData);
});

app.get("/past5Games/:summonerName", async (req, res) => {
    const playerName = req.params.summonerName;
    const PUUID = await getPlayerPUUID(playerName);
    console.log(PUUID);

    const API_CALL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?api_key=${API_KEY}`;

    const gameIds = await axios.get(API_CALL)
        .then(response => {
            return response.data;
        })
        .catch(error => error);
        
        console.log(gameIds);

        let matchDataArray = [];
        for(let i = 0; i < gameIds.length - 15; i++){
            let matchId = gameIds[i];
            let matchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`)
                .then(response => { console.log(response.data); return response.data; })
                .catch(error => { error });
            matchDataArray.push(matchData);
        }
        res.json(matchDataArray);
    });



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})