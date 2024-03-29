import React, { useState } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'

import { Modal, Input } from '@common'

import ConfirmationButtons from '@local/confirmation-buttons'
import { useAutoFocus } from '@hooks'

import { actions } from './index.connect'

const AddCategoryModal = ({
  confirmText, cancelText, handleCancel, addCategory,
}) => {
  const [categoryName, setCategoryName] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const inputRef = useAutoFocus()

  const handleCategoryInputChange = ({ target: { value } }) => {
    setCategoryName(value)
  }

  const handleCategorySubmit = async (event) => {
    event.preventDefault()
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
        <form onSubmit={handleCategorySubmit}>
          <Input
            type="text"
            name="category"
            onChange={handleCategoryInputChange}
            placeholder="Popular movie links"
            category="light"
            label="Category Name"
            ref={inputRef}
          />
          <ConfirmationButtons
            confirmText={confirmText}
            cancelText={cancelText}
            handleCancel={handleCancel}
            isSubmitting={isAddingCategory}
            submitButtonType="submit"
          />
        </form>

      </Modal.Content>

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
