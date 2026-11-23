import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, bool, func, number, shape, string,
} from 'prop-types'

import { classNames } from '@common/helpers'
import {
  Spinner, Button, Modal, DropDown,
} from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'

import SharedList from '../components/shared-list'
import { mapStateToProps, actions } from './index.connect'
import './_style.scss'

const blk = 'shared-page'

const Main = ({
  shares, isFetching, unseenCount, categories, getShareInbox, markSharesSeen, getShareUnseenCount, moveShare, setAppBanner, getUserData,
}) => {
  const [shareToMove, setShareToMove] = useState(null)
  const [moveCategory, setMoveCategory] = useState(null)
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    getShareInbox()
  }, [getShareInbox])

  useEffect(() => {
    if (unseenCount > 0) {
      markSharesSeen({ all: true }).then(() => {
        getShareUnseenCount()
      })
    }
  }, [unseenCount, markSharesSeen, getShareUnseenCount])

  const handleOpen = async (share) => {
    if (share.status === 'unseen') {
      await markSharesSeen({ ids: [share.id] })
      getShareUnseenCount()
    }
    if (share.linkUrl) {
      window.open(share.linkUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleMove = (share) => {
    const options = (categories || []).filter((c) => c.id !== 'system-shared')
    setShareToMove(share)
    setMoveCategory(options[0] || null)
  }

  const handleMoveConfirm = async () => {
    if (!shareToMove || !moveCategory || isMoving) {
      return
    }
    setIsMoving(true)
    const response = await moveShare({ id: shareToMove.id, category: moveCategory })
    setIsMoving(false)
    if (response && response.success) {
      setAppBanner({ type: 'info', message: `Link moved to ${moveCategory.name}` })
      setShareToMove(null)
      setMoveCategory(null)
      getShareUnseenCount()
      getUserData()
    }
  }

  const renderContent = () => {
    if (isFetching && !shares.length) {
      return <Spinner center text="Loading shared links..." />
    }

    if (!shares.length) {
      return (
        <div className={classNames({ blk, elt: 'empty' })}>
          <h3 className={classNames({ blk, elt: 'empty-title' })}>No shared links yet</h3>
          <p className={classNames({ blk, elt: 'empty-desc' })}>
            Links shared with you by other users will appear here.
          </p>
          <Button asNav to="/links" category="plain">Go to Library</Button>
        </div>
      )
    }

    return <SharedList shares={shares} onOpen={handleOpen} onMove={handleMove} />
  }

  return (
    <main className={classNames({ blk })}>
      <div className={classNames({ blk, elt: 'header' })}>
        <div>
          <h1 className={classNames({ blk, elt: 'title' })}>Shared Inbox</h1>
          <p className={classNames({ blk, elt: 'subtitle' })}>Links people have sent directly to you. Move them into a category to keep your library organized.</p>
        </div>
        <Button category="plain" onClick={() => getShareInbox()} loading={isFetching && !!shares.length} className={classNames({ blk, elt: 'refresh-btn' })}>
          Refresh
        </Button>
      </div>
      {renderContent()}
      {shareToMove && (
        <Modal.Wrapper onEscKeydown={() => !isMoving && setShareToMove(null)}>
          <Modal.Header closeAble onClose={() => !isMoving && setShareToMove(null)}>Move to category</Modal.Header>
          <Modal.Content>
            <div className={classNames({ blk, elt: 'move-title' })}>
              {shareToMove.title || shareToMove.linkUrl}
            </div>
            <div className={classNames({ blk, elt: 'modal-copy' })}>This saves the link in your selected category and removes it from Shared inbox.</div>
            <DropDown
              category="light"
              list={(categories || []).filter((c) => c.id !== 'system-shared').map((c) => ({ value: c.name, key: c.id }))}
              label="Category"
              defaultSelected={moveCategory ? { value: moveCategory.name, key: moveCategory.id } : null}
              handleChange={(item) => setMoveCategory({ id: item.key, name: item.value })}
            />
            <ConfirmationButtons
              handleCancel={() => setShareToMove(null)}
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
    </main>
  )
}

Main.propTypes = {
  shares: arrayOf(shape({
    id: string,
    linkUrl: string,
    status: string,
  })),
  categories: arrayOf(shape({ id: string, name: string })),
  isFetching: bool,
  unseenCount: number,
  getShareInbox: func.isRequired,
  markSharesSeen: func.isRequired,
  getShareUnseenCount: func.isRequired,
  moveShare: func.isRequired,
  setAppBanner: func.isRequired,
  getUserData: func.isRequired,
}

Main.defaultProps = {
  shares: [],
  categories: [],
  isFetching: false,
  unseenCount: 0,
}

const MainWithConnect = connect(mapStateToProps, actions)(Main)

export default MainWithConnect
