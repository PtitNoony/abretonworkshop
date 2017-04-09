import bowlingGames from '../data/bowlingGames';
import publications from '../data/publications';
import foeBuildings from '../data/foebuildings';

import { getPlayerGames, getPlayerScores, getPlayerStat  } from './calculations/bowling';

var self = module.exports = {
    //
    bowlingGames: (callback) => {
        callback(bowlingGames);
    },
    //
    bowlingPlayers: (callback) => {
        var players = bowlingGames.PLAYERS.player;
        callback(players);
    },
    //
    bowlingPlayer: (playerID, callback) => {
        var player = bowlingGames.PLAYERS.player.filter(p=> p._id === playerID);
        callback(player);
    },
    //
    bowlingPlayerStats: (playerID, callback) => {
        var result = getPlayerStat(playerID, bowlingGames);
        callback(result);
    },
    //
    bowlingPlayerFullData: (playerID, callback) => {
        var result = {};
        var players = bowlingGames.PLAYERS.player;
        var player = players.filter(p=> p._id === playerID)[0];
        result.player = player;
        result.players = players;
        result.stats = getPlayerStat(playerID, bowlingGames);
        result.confrontations = getPlayerGames(playerID, bowlingGames);
        result.scores = getPlayerScores(playerID, bowlingGames);
        callback(result);
    },
    publications: (callback) => {
        callback(publications);
    },
    //
    foeEra:(callback) => {
        callback(foeBuildings.era);
    },
    //
    foeBuildingTypes:(callback) => {
        //foeBuildings
        var buildingTypes = Object.keys(foeBuildings.buildings);
        callback(buildingTypes);
    },
    //
    foeBuildings:(callback) => {
        callback(foeBuildings);
    }

};

