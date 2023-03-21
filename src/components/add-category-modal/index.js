import React, { useState } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'

import { Modal, Input } from '@common'

import ConfirmationButtons from '@local/confirmation-buttons'

import { actions } from './index.connect'

const AddCategoryModal = ({
  confirmText, cancelText, handleCancel, addCategory,
}) => {
  const [categoryName, setCategoryName] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  const handleCategoryInputChange = ({ target: { value } }) => {
    setCategoryName(value)
  }

  const handleCategorySubmit = async () => {
    setIsAddingCategory(true)
    await addCategory(categoryName)
    setIsAddingCategory(false)

    handleCancel()
  }

  return (
    <Modal.Wrapper onEscKeydown={handleCancel}>
      <Modal.Header closeAble={false}>
        Add Category
      </Modal.Header>
      <Modal.Content>
        <Input
          autoFocus
          type="text"
          name="category"
          onChange={handleCategoryInputChange}
          placeholder="Category"
          category="light"
          label="Category Name"
        />
      </Modal.Content>
      <ConfirmationButtons
        confirmText={confirmText}
        cancelText={cancelText}
        handleSubmit={handleCategorySubmit}
        handleCancel={handleCancel}
        isSubmitting={isAddingCategory}
      />
    </Modal.Wrapper>
  )
}

AddCategoryModal.propTypes = {
  confirmText: string,
  cancelText: string,
  handleCancel: func.isRequired,
  addCategory: func.isRequired,
}

AddCategoryModal.defaultProps = {
  confirmText: 'Add Category',
  cancelText: 'Cancel',
}

const AddCategoryModalWithConnect = connect(
  null, actions,
)(AddCategoryModal)

export default AddCategoryModalWithConnect
