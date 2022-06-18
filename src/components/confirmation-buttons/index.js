import React from 'react'
import { bool, func, string } from 'prop-types'

import { Button } from '@common'
import { classNames } from '@common/helpers'
import InlineSpinner from '@local/inline-spinner'

import './_style.scss'

const blk = 'action-buttons'

const ConfirmationButtons = ({
  handleCancel, handleSubmit, isSubmitting, confirmText, cancelText,
}) => (
  <div className={classNames({ blk })}>
    <Button
      onClick={handleCancel}
      category="light"
      className={classNames({ blk, elt: 'cancel' })}
    >
      {cancelText}
    </Button>
    <Button
      onClick={handleSubmit}
      category="light"
      className={classNames({ blk, elt: 'submit' })}
      loading={isSubmitting}
      loader={<InlineSpinner text="In Progress..." category="gray" />}
    >
      {confirmText}
    </Button>
  </div>
)

ConfirmationButtons.propTypes = {
  handleCancel: func.isRequired,
  handleSubmit: func.isRequired,
  isSubmitting: bool,
  confirmText: string,
  cancelText: string,
}

ConfirmationButtons.defaultProps = {
  isSubmitting: false,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
}

export default ConfirmationButtons
