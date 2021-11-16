import React from 'react'
import { bool } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'title'

const Title = ({ showForgotPassword }) => (
  <h3 className={classNames({ blk })}>
    {showForgotPassword ? 'Enter your email to get login link' : 'Login into CosmicLink'}
  </h3>
)

Title.propTypes = {
  showForgotPassword: bool,
}

Title.defaultProps = {
  showForgotPassword: false,
}

export default Title
