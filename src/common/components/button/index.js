/* eslint-disable react/button-has-type */
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import {
  node, oneOf, string, bool, func,
} from 'prop-types'

import { classNames } from '@common/helpers'
import Spinner from '../spinner'

import './_style.scss'

const blk = 'cosmic-btn'

const Button = ({
  children, type, className, category, disabled, fluid, onClick, asNav, to, loading, loader, name, size,
}) => {
  const eltClassName = classNames({
    blk,
    className,
    mods: [
      category && category,
      disabled && 'disabled',
      fluid && 'fluid',
      size && size,
    ],
  })

  if (asNav) {
    return (
      <NavLink
        to={to}
        className={eltClassName}
        onClick={onClick}
        name={name}
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
      name={name}
      disabled={loading || disabled}
    >
      {loading ? loader : children}
    </button>
  )
}

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['reset', 'submit', 'button']),
  category: oneOf(['plain', 'filled', 'vacant', 'light', 'danger']),
  className: string,
  disabled: bool,
  fluid: bool,
  onClick: func,
  to: string,
  asNav: bool,
  loader: node,
  loading: bool,
  name: string,
  size: oneOf(['small', 'medium']),
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
  loader: <Spinner size="small" inline />,
  loading: false,
  name: '',
  size: 'medium',
}

export default memo(Button)
