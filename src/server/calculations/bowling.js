//TODO optimize, memory, methods...


////TEMP
//export function getPlayer(id, games){
//    var players = games.SESSIONS ? games.SESSIONS.session : [];
//}

export function getPlayerStat(playerID_IN, games) {
    var nbGames = 0;
    var maxScore = 0;
    var totalScore = 0;
    var totalStrikes = 0;
    var totalSpares = 0;

    var sessions = games.SESSIONS ? games.SESSIONS.session : [];
//    console.log("sessions:");
//    console.log(sessions);
    if (sessions) {

        for (var j = 0; j < sessions.length; j++) {
            var confrontations = sessions[j].confrontation ? sessions[j].confrontation : [];


//            console.log("confrontations:");
//            console.log(confrontations);
            for (var i = 0; i < confrontations.length; i++) {
                // get player games
                var games = confrontations[i].game;
                if (games) {
                    // find game
                    for (var k = 0; k < games.length; k++) {
                        var game = games[k];
                        var playerID = game._player;
                        if (playerID === playerID_IN) {
//                            console.log("found 1 game:");
//                            console.log(game);
                            nbGames++;
                            var score = parseInt(game._score);
                            maxScore = Math.max(maxScore, score);
                            totalScore += score;
                            // loop turns 1 - 9
                            var turns = game.turn;
                            for (var t = 0; t < turns.length; t++) {
                                var turn = turns[t];
                                var t1 = parseInt(turn._throw_1);
                                var t2 = parseInt(turn._throw_2);
//                                console.log(" > turn " + i + " " + t1 + "_" + t2);
                                if (t1 === 10) {
                                    totalStrikes++;
                                } else if (t1 + t2 === 10) {
                                    totalSpares++;
                                }
                            }
                            // last turn
                            var lastTurn = game.lastTurn;
                            var lT1 = parseInt(lastTurn._throw_1);
                            var lT2 = parseInt(lastTurn._throw_2);
                            var lT3 = parseInt(lastTurn._throw_3);
                            // if strike 1
                            if (lT1 === 10) {
                                totalStrikes++;
                                // if strike 2
                                if (lT2 === 10) {
                                    totalStrikes++;
                                    // if strike 3
                                    if (lT3 === 10) {
                                        totalStrikes++;
                                    }
                                } else if (lT2 + lT3 === 10) {
                                    totalSpares++;
                                }
                            } else if (lT1 + lT2 === 10) {
                                totalSpares++;
                                if (lT3 === 10) {
                                    totalStrikes++;
                                }
                            }
                        }
                    }
                }
            }
        }


    }

    var avgScore = nbGames > 0 ? totalScore / nbGames : 0;
    var avgStrikes = nbGames > 0 ? totalStrikes / nbGames : 0;
    var avgSpares = nbGames > 0 ? totalSpares / nbGames : 0;


    return {
        "averageScore": avgScore.toFixed(1),
        "highScore": maxScore,
        "strikesPerGame": avgStrikes.toFixed(1),
        "sparesPerGame": avgSpares.toFixed(1)
    };
}






export function getPlayerGames(playerID_IN, games) {

    var sessions = games.SESSIONS ? games.SESSIONS.session : [];
//    console.log("sessions:");
//    console.log(sessions);

    var result = [];

    if (sessions) {
        for (var j = 0; j < sessions.length; j++) {
            
            var confrontations = sessions[j].confrontation ? sessions[j].confrontation : [];


//            console.log("confrontations:");
//            console.log(confrontations);
            for (var i = 0; i < confrontations.length; i++) {
                // get player games
                var games = confrontations[i].game;
                if (games) {
                    // find game
                    for (var k = 0; k < games.length; k++) {
                        var game = games[k];
                        var playerID = game._player;
                        if (playerID === playerID_IN) {
//                            console.log("found 1 game:");
//                            console.log(game);
                            result.push(games);
                            break;
                        }
                    }
                }
            }
        }
    }

    return result;
}



export function getPlayerScores(playerID_IN, games) {

    var sessions = games.SESSIONS ? games.SESSIONS.session : [];
//    console.log("sessions:");
//    console.log(sessions);

    var result = [];

    if (sessions) {
        for (var j = 0; j < sessions.length; j++) {
            var confrontations = sessions[j].confrontation ? sessions[j].confrontation : [];
            for (var i = 0; i < confrontations.length; i++) {
                // get player games
                var confrontationInfo = confrontations[i];
                var confrontationGames = confrontationInfo.game;
                if (confrontationGames) {
                    // find game
                    for (var k = 0; k < confrontationGames.length; k++) {
                        var game = confrontationGames[k];
                        var playerID = game._player;
                        if (playerID === playerID_IN) {
//                            console.log("___________");
//                            console.log(confrontations);
//                            console.log("---------");
//                            console.log(confrontationGames);
//                            console.log("___________");
                            game.date = confrontationInfo._confrontationDate;
                            result.push(game);
                        }
                    }
                }
            }
        }
    }

    return result;
}