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
  handleCancel,
  handleSubmit,
  isSubmitting,
  submitDisabled,
  confirmText,
  cancelText,
  type,
  submitButtonType,
}) => (
  <div className={classNames({ blk })}>
    <Button
      onClick={handleCancel}
      category="light"
      className={classNames({ blk, elt: 'cancel' })}
      disabled={isSubmitting}
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
      disabled={isSubmitting || submitDisabled}
    >
      {confirmText}
    </Button>
  </div>
)

ConfirmationButtons.propTypes = {
  handleCancel: func.isRequired,
  handleSubmit: func,
  isSubmitting: bool,
  submitDisabled: bool,
  confirmText: string,
  cancelText: string,
  type: oneOf(['delete', 'submit']),
  submitButtonType: string,
}

ConfirmationButtons.defaultProps = {
  handleSubmit() {},
  isSubmitting: false,
  submitDisabled: false,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  type: 'submit',
  submitButtonType: 'button',
}

export default ConfirmationButtons
