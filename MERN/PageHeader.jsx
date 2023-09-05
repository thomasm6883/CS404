import React from 'react'
import PropTypes from 'prop-types'

import GameForm from './GameForm.jsx'
import DetailsModal from './DetailsModal'

export default function PageHeader(props) {
  const { title, subtitle } = props

  //show a modal for a form
  const [showFormModal, setShowFormModal] = React.useState(false)
  const displayFormRequest = () => {
    setShowFormModal(true)
  }

  return (
    <div className="pb-2 mt-4 mb-2 border-bottom" style={{ width: '100%' }}>
      <h1>{title}</h1>
      {subtitle}
      <input type="button" value="Add Game" style={{float: 'right'}} onClick={displayFormRequest} />
      <DetailsModal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        >
        <GameForm/>
      </DetailsModal>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
}

PageHeader.defaultProps = {
  title: 'Page Title',
  subTitle: 'Page Subtitle'
}
