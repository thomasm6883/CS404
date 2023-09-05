import React from 'react'
import PropTypes from 'prop-types'

import { retrieveGames } from '../datahelper.js'

import GameCard from './GameCard.jsx'

import DetailsContext from '../main.jsx'

export default function GameGrid (props) {
    const {value1, value2} = React.useContext(DetailsContext)
    const [onChange, setOnChange] = value2

  //a component state, the default value is [], an array
  const [games, setGames] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const gameData = await retrieveGames()

      setGames(gameData)
    }
    fetchData()
  }, [onChange])

  const gameCards = games.map(game => <GameCard key={game.id} {...game} {...props}/>)

  return (
    <div className='row'>
      {gameCards}
    </div>
  )
}
