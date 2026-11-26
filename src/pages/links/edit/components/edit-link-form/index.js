import React from 'react'
import {
  bool, func, shape, string,
} from 'prop-types'

import { Input } from '@common'
import { classNames } from '@common/helpers'
import ConfirmationButtons from '@local/confirmation-buttons'

import './_style.scss'

const blk = 'edit-link-form'

const EditLinkForm = ({
  values, errors, isSubmitting, onChange, onCancel, onSubmit,
}) => (
  <form className={classNames({ blk })} onSubmit={onSubmit} noValidate>
    <Input
      category="dark"
      label="Title"
      name="title"
      value={values.title}
      onChange={onChange}
      error={errors.title}
      placeholder="Link title"
      autoFocus
    />
    <Input
      category="dark"
      label="Description"
      name="description"
      as="textarea"
      rows="5"
      value={values.description}
      onChange={onChange}
      error={errors.description}
      placeholder="Add a short description"
    />
    <ConfirmationButtons
      handleCancel={onCancel}
      isSubmitting={isSubmitting}
      confirmText="Save changes"
      cancelText="Cancel"
      submitButtonType="submit"
      category="dark"
    />
  </form>
)

EditLinkForm.propTypes = {
  values: shape({
    title: string.isRequired,
    description: string.isRequired,
  }).isRequired,
  errors: shape({
    title: string,
    description: string,
  }),
  isSubmitting: bool,
  onChange: func.isRequired,
  onCancel: func.isRequired,
  onSubmit: func.isRequired,
}

EditLinkForm.defaultProps = {
  errors: {},
  isSubmitting: false,
}

export default EditLinkForm
