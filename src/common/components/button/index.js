/* eslint-disable react/button-has-type */
import React from 'react'
import {
  node, oneOf, string, bool, func,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-btn'

const Button = ({
  children, type, className, category, disabled, fluid, onClick,
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
    <button
      className={eltClassName}
      type={type}
      onClick={onClick}
    >
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
  onClick: func,
}

Button.defaultProps = {
  type: 'button',
  className: '',
  category: 'plain',
  disabled: false,
  fluid: false,
  onClick() {},
}

export default Button
