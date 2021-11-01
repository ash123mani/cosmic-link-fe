/* eslint-disable react/button-has-type */
import React from 'react'
import {
  node, oneOf, string, bool,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-btn'

const Button = ({
  children, type, className, category, disabled, fluid,
}) => {
  const eltClassName = classNames({
    blk,
    className,
    mods: [
      category && category,
      disabled && 'disabled',
      fluid && 'fluid',
    ],
  })

  return (
    <button className={eltClassName} type={type}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['reset', 'submit', 'button']),
  category: oneOf(['plain', 'filled']),
  className: string,
  disabled: bool,
  fluid: bool,
}

Button.defaultProps = {
  type: 'button',
  className: '',
  category: 'plain',
  disabled: false,
  fluid: false,
}

export default Button
