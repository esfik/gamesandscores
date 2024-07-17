const baseUrl = "https://669762d002f3150fb66d68ac.mockapi.io/api/v1/"
async function getGames() {
    const urlGame = "games"
    let games = await httpGet(`${baseUrl}${urlGame}`)
    return games
}


async function getScores() {
    const urlScore = "scores"
    let scores = await httpGet(`${baseUrl}${urlScore}`);
    return scores
}


async function httpGet(url) {
    let response = await fetch(url)
    let entities = await response.json()
    return entities
}


async function joinGamesAndScores() {
    const games = await getGames();
    const scores = await getScores();
    const scoreGames =  joinEntities(games, scores)
    let gamesWithScoresNull = setScore(games , null)
    
    return changeScore(gamesWithScoresNull ,scoreGames )
}
joinGamesAndScores().then((scoreGames)=>{console.log(scoreGames)})


function joinEntities(entityA, entityB) {
    let entityC =[]
    for (let i = 0; i < entityB.length; i++) {
        let objectEntityB = entityB[i]

        for (let j = 0; j < entityA.length; j++) {
            let objectEntityA = entityA[j]
           
            if(objectEntityA.id === objectEntityB.id){
                entityC.push({...objectEntityA ,...objectEntityB})
                break
             }

        }
       
    }
    return entityC
    
}

function changeScore(games,gamesWithScores ){
   for(let i = 0 ; i<games.length ; i++){
    
      for(let j = 0 ; j < gamesWithScores.length ; j++){
             if (games[i].id === gamesWithScores[j].id){
                games[i].score = gamesWithScores[j].score
             }
      }
   }
   return games
}


function setScore(games , value){
     let array = []
      for(let i = 0 ; i < games.length ; i++){
        let game = games[i]
        array.push({...game , "score" : value})
      }
      return array
}
