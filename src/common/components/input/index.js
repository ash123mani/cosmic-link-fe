/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react'
import {
  string, func, oneOf, shape,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-input'

const Input = ({
  className, placeholder, label, errorMessage, type, onChange, name, category, as, ...extraProps
}) => {
  const eltClassName = classNames({
    blk,
    className,
    mods: [
      errorMessage && 'error',
      category,
    ],
  })

  return (
    <div className={eltClassName}>
      {label && (
        <label
          htmlFor={name}
          className={classNames({ blk, elt: 'label', mods: [category] })}
        >
          {label}
        </label>
      )}
      {as === 'textarea'
        ? (
          <textarea
            className={classNames({ blk, elt: 'box', mods: [category] })}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            name={name}
            {...extraProps}
          />
        )
        : (
          <input
            className={classNames({ blk, elt: 'box', mods: [category] })}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            name={name}
            {...extraProps}
          />
        )}

      {errorMessage && (
        <div
          className={classNames({ blk, elt: 'error' })}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}

Input.propTypes = {
  className: string,
  placeholder: string,
  name: string.isRequired,
  label: string,
  errorMessage: string,
  type: string,
  onChange: func,
  category: oneOf(['dark', 'light']),
  extraProps: shape({}),
  as: oneOf(['textarea', 'input']),
}

Input.defaultProps = {
  className: '',
  placeholder: '',
  label: '',
  errorMessage: '',
  type: 'text',
  onChange: () => {},
  category: 'dark',
  extraProps: {},
  as: 'input',
}

export default memo(Input)
