import React from 'react'
import PropTypes from 'prop-types'
import DetailsContext from '../main'

import DeleteModal from './DeleteModal'

const deleteStyle = {
  cursor: 'pointer',
  float: 'right'
}

export default function GameDetails (props) {

  const {value1, value2} = React.useContext(DetailsContext)
  const details = value1

  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const handleClickDelete = (event) => {
    event.preventDefault()
    setShowDeleteModal(true)
  }

  return (
    <div className="container">
      <div style={deleteStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onClick={handleClickDelete} className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </div>
      <DeleteModal
        gameID={details.id}
        open={showDeleteModal}
        onClose={() => {setShowDeleteModal(false)}}
      />

      <div className="row">
        <div className="col-5" style={{marginBottom: 16+'px'}}>
          <img className='img-responsive' alt={`Poster for ${details.name}`} src={`${details.poster}`} height="250px"/>
        </div>
        <div className="col-2">
          <h4>{'Year: '}</h4>{`${details.year}`}
          <h4>{'Rated: '}</h4>{`${details.rating}`}
          <h4>{'Age:'}</h4>{`${details.minage}`}
        </div>
        <div className="col-5">
          <h4>{'Players: '}</h4>{`${details.minplayers} - ${details.maxplayers} Players`}
          <h4>{'Time: '}</h4>{`${details.minplayTime} - ${details.maxplayTime} Minutes`}
          <h4>{'Challenge Weight: '}</h4>{`${details.weight}`}
        </div>
      </div>


      <div className = "row">
        <div>
          <h4>{'About: '}</h4>{`${details.desc}`}
        </div>
      </div>

      <br />



      <div className="col-12">
        <div className="row">
          <div className="col-4">
            <h4>{'Designers:'}</h4>{`${details.designer}`}
          </div>
          <div className="col-4">
            <h4>{'Artists:'}</h4>{`${details.artist}`}
          </div>
          <div className="col-4">
            <h4>{'Publishers:'}</h4>{`${details.publisher}`}
          </div>

        </div>
      </div>



    </div>
  )
}
