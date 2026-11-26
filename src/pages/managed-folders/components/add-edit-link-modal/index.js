import React from 'react'
import PropTypes from 'prop-types'

import AddLinkModal from '@local/add-link-modal'

const AddManagedLinkModal = ({
  isOpen, onClose, onSubmit, isSubmitting,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <AddLinkModal
      onClose={onClose}
      onSubmit={async (meta) => onSubmit({
        linkUrl: meta.linkUrl,
        title: meta.title,
        description: meta.description,
        imageUrl: meta.imageUrl || '',
        siteName: meta.siteName || '',
      })}
      categories={[]}
      title="Add link"
      isSubmitting={isSubmitting}
    />
  )
}

AddManagedLinkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
}

AddManagedLinkModal.defaultProps = { isSubmitting: false }

export default AddManagedLinkModal
