import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, shape, string, func,
} from 'prop-types'

import { classNames } from '@common/helpers'
import LinkCard from '@local/link-card'
import ConfirmationModal from '@local/confirmation-modal'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'link-cards'

const LinkCards = ({ categoryLinks, setAppBanner, deleteLink }) => {
  // const [fadeUp, setFadeUp] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [selectedCardToDelete, setSelectedCardToDelete] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleLinkCopyClick = () => {
    setAppBanner({
      type: 'info',
      message: 'Link Url copied succesfully',
    })
  }

  const handleConfirm = async () => {
    setShowConfirmationModal(false)
    setIsDeleting(true)

    const { success } = await deleteLink(selectedCardToDelete)
    setIsDeleting(false)

    const link = categoryLinks.filter((link) => link.id === selectedCardToDelete)[0]
    if (success) {
      // setFadeUp(true)
      setTimeout(() => {
        // setFadeUp(false)
      })
      setAppBanner({
        type: 'info',
        message: `${link.title} of ${link.category.name} deleted succesfully`,
      })
    }
  }

  const handleCancel = () => setShowConfirmationModal(false)

  const handleDeleteClick = (linkId) => {
    setSelectedCardToDelete(linkId)
    setShowConfirmationModal(true)
  }

  const renderLinks = () => categoryLinks.map((link) => {
    const {
      title, description, imageUrl, siteName, linkUrl, id,
    } = link

    return (
      <LinkCard
        title={title}
        imageUrl={imageUrl}
        description={description}
        siteName={siteName}
        linkUrl={linkUrl}
        onLinkCopy={handleLinkCopyClick}
        onLinkDelete={handleDeleteClick}
        linkId={id}
        key={id}
        fadeDown
        // fadeUp={fadeUp}
        isDeleting={isDeleting}
      />
    )
  })

  return (
    <div className={classNames({ blk })}>
      {renderLinks()}
      {showConfirmationModal && (
        <ConfirmationModal
          handleSubmit={handleConfirm}
          handleCancel={handleCancel}
          message="Do you want to delete this link ?"
          confirmText="Delete"
        />
      )}
    </div>
  )
}

LinkCards.propTypes = {
  categoryLinks: arrayOf(shape({
    title: string,
    description: string,
    siteName: string,
    imageUrl: string,
    category: shape({
      id: string,
      name: string,
    }),
    linkUrl: string,
  })),
  setAppBanner: func.isRequired,
  deleteLink: func.isRequired,
}

LinkCards.defaultProps = {
  categoryLinks: [],
}

const LinkCardsWithConnect = connect(
  null, actions,
)(LinkCards)

export default LinkCardsWithConnect
