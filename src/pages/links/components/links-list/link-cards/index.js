import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, shape, string, func,
} from 'prop-types'

import { classNames } from '@common/helpers'
import { Modal, DropDown } from '@common'
import LinkCard from '@local/link-card'
import ConfirmationModal from '@local/confirmation-modal'
import ConfirmationButtons from '@local/confirmation-buttons'
import SendLinkModal from '@local/send-link-modal'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'link-cards'

const LinkCards = ({
  categoryLinks, setAppBanner, deleteLink, updateLink, getUserData, categories,
}) => {
  // const [fadeUp, setFadeUp] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [selectedCardToDelete, setSelectedCardToDelete] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [linkToSend, setLinkToSend] = useState(null)
  const [linkToMove, setLinkToMove] = useState(null)
  const [moveCategory, setMoveCategory] = useState(null)
  const [isMoving, setIsMoving] = useState(false)

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

  const handleSendClick = (link) => {
    setLinkToSend(link)
  }

  const handleMoveClick = (link) => {
    setLinkToMove(link)
    const options = (categories || []).filter((c) => c.id !== link.category?.id)
    setMoveCategory(options[0] || null)
  }

  const handleMoveConfirm = async () => {
    if (!linkToMove || !moveCategory || isMoving) {
      return
    }
    setIsMoving(true)
    const response = await updateLink({
      id: linkToMove.id,
      description: linkToMove.description || '',
      category: moveCategory,
    })
    setIsMoving(false)
    if (response && response.success) {
      setAppBanner({
        type: 'info',
        message: `Link moved to ${moveCategory.name}`,
      })
      setLinkToMove(null)
      setMoveCategory(null)
      getUserData()
    }
  }

  const renderLinks = () => categoryLinks.map((link) => {
    const {
      title, description, imageUrl, siteName, linkUrl, id, sharedBy,
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
        onLinkSend={() => handleSendClick(link)}
        onLinkMove={() => handleMoveClick(link)}
        sharedBy={sharedBy}
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
          modalType="delete"
        />
      )}
      {linkToSend && (
        <SendLinkModal
          link={linkToSend}
          onClose={() => setLinkToSend(null)}
          onSent={(user) => {
            setAppBanner({
              type: 'info',
              message: `Link sent to @${user.username}`,
            })
          }}
        />
      )}
      {linkToMove && (
        <Modal.Wrapper onEscKeydown={() => !isMoving && setLinkToMove(null)}>
          <Modal.Header closeAble={!isMoving} onClose={() => setLinkToMove(null)}>
            Move to category
          </Modal.Header>
          <Modal.Content>
            <div className={classNames({ blk, elt: 'move-title' })}>
              {linkToMove.title || linkToMove.linkUrl}
            </div>
            <DropDown
              category="light"
              list={(categories || []).filter((c) => c.id !== linkToMove.category?.id).map((c) => ({ value: c.name, key: c.id }))}
              label="Select category"
              defaultSelected={moveCategory ? { value: moveCategory.name, key: moveCategory.id } : null}
              handleChange={(item) => setMoveCategory({ id: item.key, name: item.value })}
            />
            <ConfirmationButtons
              handleCancel={() => setLinkToMove(null)}
              handleSubmit={handleMoveConfirm}
              isSubmitting={isMoving}
              submitDisabled={!moveCategory}
              confirmText="Move"
              cancelText="Cancel"
              type="submit"
            />
          </Modal.Content>
        </Modal.Wrapper>
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
  categories: arrayOf(shape({ id: string, name: string })),
  setAppBanner: func.isRequired,
  deleteLink: func.isRequired,
  updateLink: func.isRequired,
  getUserData: func.isRequired,
}

LinkCards.defaultProps = {
  categoryLinks: [],
  categories: [],
}

const LinkCardsWithConnect = connect(
  null, actions,
)(LinkCards)

export default LinkCardsWithConnect
