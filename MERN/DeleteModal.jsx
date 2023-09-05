import React from 'react'

import { Modal } from 'bootstrap'
import {deleteGame} from '../datahelper.js'

import DetailsContext from '../main.jsx'

export default function DeleteModal(props) {
  const {gameID, open, onClose} = props

  const {value1, value2} = React.useContext(DetailsContext)
  const [onChange, setOnChange] = value2

  const modalRef = React.useRef()
  const [modalObj, setModalObj] = React.useState(null)
  React.useEffect( () => {
    if (modalRef.current && !modalObj) {
      const deleteModal = new Modal(modalRef.current)
      modalRef.current.addEventListener('hidden.bs.modal', event => {
        onClose()
      })
      setModalObj(deleteModal)
    }
  }, [modalRef, onClose])

  React.useEffect(() => {
    if (modalObj) {
      if (open) {
        modalObj.show()
      }
      else {
        modalObj.hide()
      }
    }
  }, [open, modalObj])

  const deleteThis = () => {
    deleteGame(gameID)
    setOnChange(true)
  }

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xs">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {`Delete this Game?`}
            </h1>
          </div>
          <div className="modal-footer">
            <button type="submit" onClick={deleteThis} className="btn btn-secondary" data-bs-dismiss="modal">Yes</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  )
}
