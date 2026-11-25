import React from 'react'
import {
  bool, func, number, string,
} from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import { Button } from '@common'
import { classNames } from '@common/helpers'
import './_style.scss'

const blk = 'links-title'

const Icon = ({ name }) => {
  if (name === 'plus') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M12 11v4M10 13h4" />
    </svg>
  )
}

Icon.propTypes = { name: string.isRequired }

const Title = ({
  toggleAddLinkModal, toggleAddCategoryModal, selectedCategoryName, selectedCategoryCount, isFetchingLinks,
}) => {
  const isSmallOnly = useMediaQuery({ maxWidth: 767 })
  const hasCount = typeof selectedCategoryCount === 'number'

  return (
    <header className={classNames({ blk, mods: [isSmallOnly && 'compact'] })}>
      <div className={classNames({ blk, elt: 'top' })}>
        <div className={classNames({ blk, elt: 'copy' })}>
          <p className={classNames({ blk, elt: 'eyebrow' })}>Library</p>
          <h1 className={classNames({ blk, elt: 'heading' })}>Your Links</h1>
          <p className={classNames({ blk, elt: 'subtitle' })}>Save, organize, and revisit links in your cosmos.</p>
        </div>

        <div className={classNames({ blk, elt: 'actions' })}>
          <Button
            category="plain"
            onClick={toggleAddCategoryModal}
            className={classNames({ blk, elt: 'action', mods: ['secondary'] })}
            aria-label="Add category"
            title="Add category"
          >
            <span className={classNames({ blk, elt: 'action-icon' })}><Icon name="category" /></span>
            <span className={classNames({ blk, elt: 'action-label', mods: ['desktop'] })}>Add category</span>
          </Button>
          <Button
            category="filled"
            onClick={toggleAddLinkModal}
            className={classNames({ blk, elt: 'action', mods: ['primary'] })}
            aria-label="Add link"
            title="Add link"
          >
            <span className={classNames({ blk, elt: 'action-icon' })}><Icon name="plus" /></span>
            <span className={classNames({ blk, elt: 'action-label' })}>Add link</span>
          </Button>
        </div>
      </div>

      <div className={classNames({ blk, elt: 'context' })} aria-live="polite">
        <span className={classNames({ blk, elt: 'context-label' })}>Category</span>
        <span className={classNames({ blk, elt: 'context-name' })}>{selectedCategoryName || 'All links'}</span>
        {(hasCount || isFetchingLinks) && <span className={classNames({ blk, elt: 'context-sep' })} aria-hidden="true">•</span>}
        {isFetchingLinks && <span className={classNames({ blk, elt: 'context-meta' })}>Loading…</span>}
        {!isFetchingLinks && hasCount && (
          <span className={classNames({ blk, elt: 'context-meta' })}>
            {selectedCategoryCount}
            {' '}
            {selectedCategoryCount === 1 ? 'link' : 'links'}
          </span>
        )}
      </div>
    </header>
  )
}

Title.propTypes = {
  toggleAddLinkModal: func.isRequired,
  toggleAddCategoryModal: func.isRequired,
  selectedCategoryName: string,
  selectedCategoryCount: number,
  isFetchingLinks: bool,
}

Title.defaultProps = {
  selectedCategoryName: '',
  selectedCategoryCount: null,
  isFetchingLinks: false,
}

export default Title
