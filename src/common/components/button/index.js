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
  children, type, className, category, disabled, fluid, onClick, asNav, to, loading, loader, name,
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
    >
      {loading ? loader : children}
    </button>
  )
}

Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['reset', 'submit', 'button']),
  category: oneOf(['plain', 'filled', 'vacant', 'light']),
  className: string,
  disabled: bool,
  fluid: bool,
  onClick: func,
  to: string,
  asNav: bool,
  loader: node,
  loading: bool,
  name: string,
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
}

export default memo(Button)
