import React from 'react'
import PropTypes from 'prop-types'

const imgStyle = {
  maxHeight: '100%',
  height: 'auto'
}
const gameSummaryStyle = {
  marginBottom: '15px',
  verticalAlign: 'bottom',
  border: '1px solid #000000',
  borderRadius: '10px',
  boxShadow: '#000000 3px 3px 6px',
  transition: 'box-shadow 0.3s ease-in-out',
  textAlign: 'center',
  padding: '5px',
  cursor: 'pointer'
}

const summaryTitleStyle = {
  display: 'block',
  fontSize: 'medium',
  height: '4.5em'
}
const summaryInfoStyle = {
  display: 'block',
  fontSize: 'medium',
  height: '5em',
  overflowY: 'auto'
}




export default function GameCard (props) {
  const { id, name, year, rating, publisher, thumb, onDetailsRequested } = props

  const handleClick = (event) => {
    event.preventDefault()
    onDetailsRequested(id)
  }

  return(
    <div className='col-sm-6 col-lg-4 col-sm-2' onClick={handleClick}>
      <div style={gameSummaryStyle}>
        <span style={summaryTitleStyle}> {name}

        </span>
          <img
            style={imgStyle}
            alt={`Poster for ${name}`}
            src={`${thumb}`}
          />
          <br />
        <span style={summaryInfoStyle}>
          {`${year}, ${rating}`}
          <br />
          {publisher.join(', ')}
        </span>
     </div>
    </div>
  )
}

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.number,
  rating: PropTypes.number,
  thumb: PropTypes.string,
  publisher: PropTypes.arrayOf(PropTypes.string),
  onDetailsRequested: PropTypes.func
}

GameCard.defaultProps = {
  publisher: [],
  thumb: 'missing.jpg',
  onDetailsRequested: () => { },
  rating: 0
}
