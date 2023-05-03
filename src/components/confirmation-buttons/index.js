import React from 'react'
import {
  bool, func, string, oneOf,
} from 'prop-types'

import { Button } from '@common'
import { classNames } from '@common/helpers'
import InlineSpinner from '@local/inline-spinner'

import './_style.scss'

const blk = 'action-buttons'

const ConfirmationButtons = ({
  handleCancel, handleSubmit, isSubmitting, confirmText, cancelText, type, submitButtonType,
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
      className={classNames({ blk, elt: 'submit', mods: [type] })}
      loading={isSubmitting}
      loader={<InlineSpinner text="In Progress..." category="gray" />}
      type={submitButtonType}
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
  type: oneOf(['delete', 'submit']),
  submitButtonType: string,
}

ConfirmationButtons.defaultProps = {
  isSubmitting: false,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  type: 'submit',
  submitButtonType: 'button',
}

export default ConfirmationButtons
