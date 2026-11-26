import React, { useEffect, useState } from 'react'
import {
  arrayOf, bool, func, shape, string,
} from 'prop-types'
import { connect } from 'react-redux'

import { api } from '@api'
import { Button, Spinner } from '@common'
import { classNames } from '@common/helpers'
import { isSharedCategory } from '@util/shared-category'
import ConfirmationModal from '@local/confirmation-modal'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'category-info'

const CategoryIcon = ({ shared }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {shared ? (
      <>
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H10l2 2h5.5A2.5 2.5 0 0 1 20 9.5V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        <path d="M12 11v4" />
        <path d="M10 13h4" />
      </>
    ) : (
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    )}
  </svg>
)

CategoryIcon.propTypes = { shared: bool }
CategoryIcon.defaultProps = { shared: false }

const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
)

const CategoryInfo = ({ categories, deleteCategory, setAppBanner }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [counts, setCounts] = useState({})

  useEffect(() => {
    let cancelled = false
    const loadCounts = async () => {
      const res = await api('getAllLinks')
      if (cancelled || !res?.success) {
        return
      }
      const next = {};
      (res.data?.links || []).forEach((link) => {
        const id = link.category?.id
        if (id) {
          next[id] = (next[id] || 0) + 1
        }
      })
      setCounts(next)
    }
    loadCounts()
    return () => {
      cancelled = true
    }
  }, [categories])

  const handleConfirm = async () => {
    if (!categoryToDelete) {
      return
    }
    setShowConfirmationModal(false)
    setIsDeleting(true)
    const { success } = await deleteCategory(categoryToDelete.id)
    setIsDeleting(false)
    if (success) {
      setAppBanner({ type: 'info', message: `"${categoryToDelete.name}" deleted` })
    }
    setCategoryToDelete(null)
  }

  const handleDeleteCategory = (category) => {
    if (isSharedCategory(category.id)) {
      setAppBanner({ type: 'info', message: 'Shared category cannot be deleted' })
      return
    }
    setCategoryToDelete(category)
    setShowConfirmationModal(true)
  }

  const handleCancel = () => {
    setShowConfirmationModal(false)
    setCategoryToDelete(null)
  }

  return (
    <section className={classNames({ blk })} aria-labelledby="profile-categories-heading">
      <div className={classNames({ blk, elt: 'head' })}>
        <div>
          <h2 id="profile-categories-heading" className={classNames({ blk, elt: 'section-heading' })}>Your Categories</h2>
          <p className={classNames({ blk, elt: 'section-copy' })}>Organize where your links live. Shared is managed by the system.</p>
        </div>
        <span className={classNames({ blk, elt: 'count' })}>{categories.length}</span>
      </div>

      <div className={classNames({ blk, elt: 'categories' })}>
        {!categories.length ? (
          <div className={classNames({ blk, elt: 'empty' })}>
            <div className={classNames({ blk, elt: 'empty-icon' })}><CategoryIcon shared={false} /></div>
            <p className={classNames({ blk, elt: 'empty-title' })}>No categories yet</p>
            <p className={classNames({ blk, elt: 'empty-copy' })}>Create a category from the Links page to organize your saved links.</p>
          </div>
        ) : null}
        {categories.map((category) => {
          const { name, id } = category
          const shared = isSharedCategory(id)
          const deleting = !shared && isDeleting && categoryToDelete?.id === id
          const linkCount = counts[id] || 0
          return (
            <div className={classNames({ blk, elt: 'category', mods: [shared && 'system'] })} key={id}>
              <div className={classNames({ blk, elt: 'category-main' })}>
                <span className={classNames({ blk, elt: 'icon', mods: [shared && 'system'] })}><CategoryIcon shared={shared} /></span>
                <div className={classNames({ blk, elt: 'details' })}>
                  <span className={classNames({ blk, elt: 'name' })}>{name}</span>
                  <span className={classNames({ blk, elt: 'meta' })}>
                    {linkCount}
                    {' '}
                    {linkCount === 1 ? 'link' : 'links'}
                  </span>
                </div>
              </div>
              <div className={classNames({ blk, elt: 'category-actions' })}>
                {shared ? (
                  <span className={classNames({ blk, elt: 'system-label' })}>System</span>
                ) : (
                  <Button
                    category="plain"
                    size="small"
                    className={classNames({ blk, elt: 'delete' })}
                    onClick={() => handleDeleteCategory(category)}
                    aria-label={`Delete ${name} category`}
                    disabled={deleting}
                  >
                    {deleting ? <Spinner size="small" inline /> : <DeleteIcon />}
                    <span className={classNames({ blk, elt: 'delete-text' })}>{deleting ? 'Deleting' : 'Delete'}</span>
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showConfirmationModal && categoryToDelete ? (
        <ConfirmationModal
          handleSubmit={handleConfirm}
          handleCancel={handleCancel}
          message={`Delete "${categoryToDelete.name}"? Links in it will be moved according to your category rules.`}
          confirmText="Delete"
          modalType="delete"
        />
      ) : null}
    </section>
  )
}

CategoryInfo.propTypes = {
  categories: arrayOf(shape({ name: string.isRequired, id: string.isRequired })),
  deleteCategory: func.isRequired,
  setAppBanner: func.isRequired,
}

CategoryInfo.defaultProps = { categories: [] }

export default connect(null, actions)(CategoryInfo)
