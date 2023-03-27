import React, { useState } from 'react'
import {
  arrayOf, string, shape, func,
} from 'prop-types'
import { connect } from 'react-redux'

import { Spinner } from '@common'

import { classNames } from '@common/helpers'
import Image from '@local/image'
import ConfirmationModal from '@local/confirmation-modal'
import deleteIcon from '@images/delete.svg'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'category-info'

const CategoryInfo = ({ categories, deleteCategory, setAppBanner }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setShowConfirmationModal(false)

    setIsDeleting(true)
    const { success } = await deleteCategory(categoryToDelete)
    setIsDeleting(false)

    if (success) {
      setAppBanner({
        type: 'info',
        message: 'Category deleted succesfully',
      })
    }
  }

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id)
    setShowConfirmationModal(true)
  }

  const handleCancel = () => setShowConfirmationModal(false)

  return (
    <div className={classNames({ blk })}>
      <h2 className={classNames({ blk, elt: 'section-heading' })}>
        Your Categories
      </h2>
      <div className={classNames({ blk, elt: 'categories' })}>
        {categories.map((category) => {
          const { name, id } = category
          return (
            <div
              className={classNames(
                { blk, elt: 'category' },
              )}
              id={id}
            >
              <span className={classNames({ blk, elt: 'name' })}>{name}</span>
              {isDeleting && id === categoryToDelete ? <Spinner size="small" /> : (
                <Image
                  imageUrl={deleteIcon}
                  asButton
                  className={classNames({ blk, elt: 'delete' })}
                  onClick={(e) => handleDeleteCategory(id, e)}
                  title="Delete link"
                />
              )}

            </div>
          )
        })}
        {showConfirmationModal && (
          <ConfirmationModal
            handleSubmit={handleConfirm}
            handleCancel={handleCancel}
            message="Do you want to delete this category ?"
            confirmText="Delete"
            modalType="delete"
          />
        )}
      </div>
    </div>
  )
}

CategoryInfo.propTypes = {
  categories: arrayOf(shape({
    name: string.isRequired,
    id: string.isRequired,
  })),
  deleteCategory: func.isRequired,
  setAppBanner: func.isRequired,
}

CategoryInfo.defaultProps = {
  categories: [],
}

const CategoryInfoWithConnect = connect(
  null, actions,
)(CategoryInfo)

export default CategoryInfoWithConnect
