import React from 'react'
import {
  arrayOf, bool, func, number, shape, string,
} from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import { classNames } from '@common/helpers'
import mediaQueries from '@common/media-queries'

import './_style.scss'

const blk = 'links-category-picker'

const Icon = ({ isShared }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {isShared ? (
      <>
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H10l2 2h5.5A2.5 2.5 0 0 1 20 9.5V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        <path d="M12 11v4M10 13h4" />
      </>
    ) : (
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    )}
  </svg>
)

Icon.propTypes = { isShared: bool }
Icon.defaultProps = { isShared: false }

const CategoryPicker = ({ categories, onSelect, isLoading }) => {
  const isMediumDown = useMediaQuery(mediaQueries.mediumDown)
  const layout = isMediumDown ? 'horizontal' : 'vertical'

  return (
    <nav className={classNames({ blk, mods: [layout] })} aria-label="Link categories">
      {!isMediumDown && (
        <div className={classNames({ blk, elt: 'head' })}>
          <span className={classNames({ blk, elt: 'head-title' })}>Categories</span>
          <span className={classNames({ blk, elt: 'head-count' })}>{categories.length}</span>
        </div>
      )}
      <div className={classNames({ blk, elt: 'list', mods: [layout] })} role="tablist" aria-orientation={isMediumDown ? 'horizontal' : 'vertical'}>
        {categories.map((category) => {
          const {
            id, name, isShared, isActive, count,
          } = category
          const countKnown = typeof count === 'number'
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'true' : undefined}
              className={classNames({ blk, elt: 'item', mods: [layout, isActive && 'active', isShared && 'system'] })}
              onClick={() => onSelect(id)}
              disabled={isLoading && isActive}
            >
              <span className={classNames({ blk, elt: 'item-main' })}>
                <span className={classNames({ blk, elt: 'icon', mods: [isShared && 'system'] })}><Icon isShared={isShared} /></span>
                <span className={classNames({ blk, elt: 'name' })}>{name}</span>
              </span>
              {countKnown && <span className={classNames({ blk, elt: 'count', mods: [isActive && 'active'] })}>{count}</span>}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

CategoryPicker.propTypes = {
  categories: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired,
    isShared: bool,
    isActive: bool,
    count: number,
  })).isRequired,
  onSelect: func.isRequired,
  isLoading: bool,
}

CategoryPicker.defaultProps = {
  isLoading: false,
}

export default CategoryPicker
