import {retrieveGameDetails, retrieveGames} from './dataHelper.js'

const detailsModal = new bootstrap.Modal('#myModal')


async function renderGameGrid() {
    const gameData = await retrieveGames() // <--Returns a promise
    rebuildGameGridFromData(gameData)
}

async function showModal(gameId) {
    const gameDetails = await retrieveGameDetails(gameId)

    const modalHeaderData = document.querySelector('#modalHeader')
    modalHeaderData.innerHTML = `
        <h5 class="modal-title" id="myModalLabel">${gameDetails.gameName}, <font size="1"> ${gameId} </font></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        `
    const modalBodyData = document.querySelector('#modalBody')
    modalBodyData.innerHTML = `
        <div class="gameDetails">         
            <img alt='Poster for ${gameDetails.gameName}' src='posters/${gameDetails.gameUrl}' height="250px"/>
            <br>
            <span class="gameInfo"> 
                <strong>About: </strong>${gameDetails.gameDesc} <br> <strong>Year: </strong>${gameDetails.gameYear}, <strong>Rated: </strong>${gameDetails.gameRated} <br>
                ${gameDetails.mintoPlay} - ${gameDetails.maxToPlay} Players, ${gameDetails.minTime} - ${gameDetails.maxTime} Minutes <br> 
                <strong>Challenge Weight: </strong> ${gameDetails.gameWeight}, <strong>Recommended Age:</strong> ${gameDetails.age} <br>
                <strong>Designers:</strong> ${gameDetails.gameDesigners} <br>
                <strong>Artists:</strong> ${gameDetails.gameArtists} <br>
                <strong>Publishers:</strong> ${gameDetails.gamePublishers}
            </span>
        </div> <!-- /movieSummary-->
    `

   detailsModal.show()
}

function rebuildGameGridFromData(gameData) {
    const gameGrid = document.querySelector('#gameGrid')

    gameData.forEach((game) => {
        const gameCard = document.createElement("div")
        gameCard.className = 'col-sm-4 col-sm-2 col-sm-4'

        gameCard.innerHTML = `
                <div class="gameSummary">         
                    <span class="summaryTitle"> ${game.gameName} </span>
                    <img class='img-responsive' alt='Poster for ${game.gameName}' src='posters/${game.image}' height="250px"/ >
                    <br>
                    <span class="summaryInfo"> 
                    ${game.gameYear} <br> ${game.publishers}
                    </span>
                </div> <!-- /gameSummary-->
        `
        
        gameCard.addEventListener("click", (event) => {
            event.preventDefault()
            showModal(game.gameId)
            
        })

        gameGrid.appendChild(gameCard)
    })
}

const form = document.querySelector('#addGame');
form.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = document.querySelector('#gameName').value
    const id = parseInt(document.querySelector('#gameId').value)
    const desc = document.querySelector('#gameDesc').value
    const year = parseInt(document.querySelector('#gameYear').value)
    const age = parseInt(document.querySelector('#gameAge').value)
    const rated = parseFloat(document.querySelector('#gameRated').value)
    const mintp = parseInt(document.querySelector('#gameMinToPlay').value)
    const maxtp = parseInt(document.querySelector('#gameMaxToPlay').value)
    const minTime = parseInt(document.querySelector('#gameMinTime').value)
    const maxTime = parseInt(document.querySelector('#gameMaxTime').value)
    const weight = parseFloat(document.querySelector('#gameWeight').value)
    const designers = document.querySelector('#gameDesigners').value
    const artists = document.querySelector('#gameArtists').value
    const publishers = document.querySelector('#gamePublishers').value
    const url= document.querySelector('#gameUrl').value
    

    fetch('addBGG.php', {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "gameId": id,
            "gameName": `${name}`,
            "gameDesc": `${desc}`,
            "gameYear": year,
            "gameRated": rated,
            "mintoPlay": mintp,
            "maxToPlay": maxtp,
            "minTime": minTime,
            "maxTime": maxTime,
            "gameWeight": weight,
            "age": age,
            "gameDesigners": `${designers}`,
            "gameArtists": `${artists}`,
            "gamePublishers": `${publishers}`,
            "gameUrl": `${url}`
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
    })
    .catch((error) => {
        window.alert(error)
        console.error("Error:", error);
    });
    
    const gameGrid = document.querySelector('#gameGrid')
    gameGrid.innerHTML = ""
    renderGameGrid()
});

renderGameGrid()