import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  arrayOf, shape, string, func,
} from 'prop-types'

import { classNames } from '@common/helpers'
import { Modal, DropDown } from '@common'
import LinkCard from '@local/link-card'
import ConfirmationButtons from '@local/confirmation-buttons'
import SendLinkModal from '@local/send-link-modal'
import { useAsyncAction, useDisclosure } from '@hooks'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'link-cards'

const LinkCards = ({
  categoryLinks, setAppBanner, deleteLink, updateLink, getUserData, categories,
}) => {
  const history = useHistory()
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null)
  const [linkToSend, setLinkToSend] = useState(null)
  const [linkToMove, setLinkToMove] = useState(null)
  const [moveCategory, setMoveCategory] = useState(null)
  const deleteDialog = useDisclosure(false)
  const deleteAction = useAsyncAction()
  const moveAction = useAsyncAction()

  const handleLinkCopyClick = () => {
    setAppBanner({ type: 'info', message: 'Link Url copied succesfully' })
  }

  const handleDeleteClick = (linkId) => {
    const link = categoryLinks.find((item) => item.id === linkId)
    setSelectedCardToDelete(link || null)
    deleteDialog.open()
  }

  const handleConfirmDelete = async () => {
    if (!selectedCardToDelete) {
      return
    }
    await deleteAction.execute(() => deleteLink(selectedCardToDelete.id), {
      onSuccess: async () => {
        setAppBanner({
          type: 'info',
          message: `${selectedCardToDelete.title} of ${selectedCardToDelete.category?.name || 'category'} deleted succesfully`,
        })
        deleteDialog.close()
        setSelectedCardToDelete(null)
      },
    })
  }

  const handleMoveClick = (link) => {
    setLinkToMove(link)
    const options = (categories || []).filter((c) => c.id !== link.category?.id)
    setMoveCategory(options[0] || null)
  }

  const handleMoveConfirm = async () => {
    if (!linkToMove || !moveCategory) {
      return
    }
    await moveAction.execute(() => updateLink({
      id: linkToMove.id,
      description: linkToMove.description || '',
      category: moveCategory,
    }), {
      onSuccess: async () => {
        setAppBanner({ type: 'info', message: `Link moved to ${moveCategory.name}` })
        setLinkToMove(null)
        setMoveCategory(null)
        getUserData()
      },
    })
  }

  return (
    <div className={classNames({ blk })}>
      {categoryLinks.map((link) => (
        <LinkCard
          title={link.title}
          imageUrl={link.imageUrl}
          description={link.description}
          siteName={link.siteName}
          linkUrl={link.linkUrl}
          onLinkCopy={handleLinkCopyClick}
          onLinkDelete={handleDeleteClick}
          onLinkSend={() => setLinkToSend(link)}
          onLinkMove={() => handleMoveClick(link)}
          onLinkEdit={() => history.push({ pathname: `/links/${link.id}/edit`, state: { from: '/links' } })}
          sharedBy={link.sharedBy}
          linkId={link.id}
          key={link.id}
          fadeDown
          isDeleting={deleteAction.isLoading && selectedCardToDelete?.id === link.id}
        />
      ))}

      {deleteDialog.isOpen && (
        <Modal.Wrapper onEscKeydown={() => !deleteAction.isLoading && deleteDialog.close()}>
          <Modal.Header closeAble={!deleteAction.isLoading} onClose={deleteDialog.close}>Are you sure ?</Modal.Header>
          <Modal.Content>
            <p className={classNames({ blk, elt: 'confirm' })}>Do you want to delete this link ?</p>
            <ConfirmationButtons
              handleCancel={deleteDialog.close}
              handleSubmit={handleConfirmDelete}
              isSubmitting={deleteAction.isLoading}
              confirmText="Delete"
              type="delete"
            />
          </Modal.Content>
        </Modal.Wrapper>
      )}

      {linkToSend && (
        <SendLinkModal
          link={linkToSend}
          onClose={() => setLinkToSend(null)}
          onSent={(user) => setAppBanner({ type: 'info', message: `Link sent to @${user.username}` })}
        />
      )}

      {linkToMove && (
        <Modal.Wrapper onEscKeydown={() => !moveAction.isLoading && setLinkToMove(null)}>
          <Modal.Header closeAble={!moveAction.isLoading} onClose={() => setLinkToMove(null)}>Move to category</Modal.Header>
          <Modal.Content>
            <div className={classNames({ blk, elt: 'move-title' })}>{linkToMove.title || linkToMove.linkUrl}</div>
            <DropDown
              category="light"
              list={(categories || []).filter((c) => c.id !== linkToMove.category?.id).map((c) => ({ value: c.name, key: c.id }))}
              label="Select category"
              defaultSelected={moveCategory ? { value: moveCategory.name, key: moveCategory.id } : null}
              handleChange={(item) => setMoveCategory({ id: item.key, name: item.value })}
              searchable
              searchPlaceholder="Search categories"
              emptyText="No categories available"
            />
            <ConfirmationButtons
              handleCancel={() => setLinkToMove(null)}
              handleSubmit={handleMoveConfirm}
              isSubmitting={moveAction.isLoading}
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
  categoryLinks: arrayOf(shape({ id: string, title: string, category: shape({ id: string, name: string }) })),
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

export default connect(null, actions)(LinkCards)
