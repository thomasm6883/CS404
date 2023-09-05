import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'bootstrap'

import DetailsContext from '../main.jsx'


export default function DetailsModal (props) {
  const {open, onClose, children} = props

  const {value1, value2} = React.useContext(DetailsContext)
  const data = value1
  const [onAddition, setOnAddition] = value2

  const modalRef = React.useRef()
  const [modalObj, setModalObj] = React.useState(null)
  React.useEffect( () => {
    if (modalRef.current && !modalObj) {
      const gameDetailsModal = new Modal(modalRef.current)
      modalRef.current.addEventListener('hidden.bs.modal', event => {
        onClose()
      })
      setModalObj(gameDetailsModal)
    }
    if (onAddition) {
      onClose()
      setOnAddition(false)
    }
  }, [modalRef, onClose, onAddition])

  //open the modal when the open prop changes
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

  return (
    <div ref={modalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {data?.name}

            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{'Close'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

DetailsModal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
}

DetailsModal.defaultProps = {
  title: 'Modal Title',
  children: null
}
