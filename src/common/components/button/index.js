/* eslint-disable react/button-has-type */
import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  node, oneOf, string, bool, func,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-btn'

const Button = ({
  children, type, className, category, disabled, fluid, onClick, asNav, to,
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

  if (asNav) {
    return (
      <NavLink
        to={to}
        className={eltClassName}
        onClick={onClick}
      >
        {children}
      </NavLink>
    )
  }

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
  to: string,
  asNav: bool,
}

Button.defaultProps = {
  type: 'button',
  className: '',
  category: 'plain',
  disabled: false,
  fluid: false,
  onClick() {},
  to: '',
  asNav: false,
}

export default Button
