import React from 'react'
import { bool, func } from 'prop-types'

import { Button } from '@common'
import { classNames } from '@common/helpers'
import InlineSpinner from '@local/inline-spinner'

import './_style.scss'

const blk = 'action-buttons'

const ActionButtons = ({ handleCancel, handleSubmit, isLoading }) => (
  <div className={classNames({ blk })}>
    <Button
      onClick={handleCancel}
      category="light"
      className={classNames({ blk, elt: 'cancel' })}
    >
      Cancel
    </Button>
    <Button
      onClick={handleSubmit}
      category="light"
      className={classNames({ blk, elt: 'submit' })}
      loading={isLoading}
      loader={<InlineSpinner text="Getting..." category="gray" />}
    >
      Add Link
    </Button>
  </div>
)

ActionButtons.propTypes = {
  handleCancel: func.isRequired,
  handleSubmit: func.isRequired,
  isLoading: bool,
}

ActionButtons.defaultProps = {
  isLoading: false,
}

export default ActionButtons
