import React from 'react'

import PageHeader from './PageHeader.jsx'
import GameGrid from './GameGrid.jsx'
import DetailsModal from './DetailsModal.jsx'
import GameDetails from './GameDetails.jsx'
import { retrieveGameDetails } from '../datahelper.js'

import DetailsContext from '../main.jsx'


//export const ChangeContext = React.createContext()

// const ChangeProvider = (props) => {
//   const [onAddition, setOnAddition] = React.useState(false)
//   return (
//     <ChangeContext.Provider value={[onAddition, setOnAddition]}>
//       {props.children}
//     </ChangeContext.Provider>
//   )
// }

export default function App (props) {

  //show the modal with use effect and state
  const [showDetailsModal, setShowDetailsModal] = React.useState(false)
  const [currentGameId, setCurrentGameId] = React.useState(null)
  const detailsRequested = (gameId) => {
    setCurrentGameId(gameId)
    setShowDetailsModal(true)
  }

  //get the data for all games
  const [currentGameData, setCurrentGameData] = React.useState(null)
  React.useEffect(() => {
    const fetchDetails = async () => {
      const gameData = await retrieveGameDetails(currentGameId)
      setCurrentGameData(gameData[0])
    }

    if (currentGameId !== null) {
      fetchDetails(currentGameId)
    }
  }, [currentGameId])

  const [onChange, setOnChange] = React.useState(false)

  return (
    <div className='container'>
      <DetailsContext.Provider value={{value1: currentGameData, value2: [onChange, setOnChange]}}>

          <PageHeader title='Board Game Geek Collection' subtitle='Click on a board game below for more information'/>
          <GameGrid onDetailsRequested={detailsRequested}/>

        <DetailsModal
          open={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        >
          {!!currentGameData &&
          <GameDetails onClose={() => setShowDetailsModal(false)}/>}
        </DetailsModal>
      </DetailsContext.Provider>
    </div>
  )
}
