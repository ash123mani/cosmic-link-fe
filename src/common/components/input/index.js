/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, forwardRef } from 'react'
import {
  string, func, oneOf, shape, object, oneOfType,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-input'

const Input = forwardRef((props, ref) => {
  const {
    className, placeholder, label, errorMessage, type, onChange, name, category, as, ...extraProps
  } = props
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
            {...extraProps}
            className={classNames({ blk, elt: 'box', mods: [category] })}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            name={name}
            ref={ref}
          />
        )
        : (
          <input
            {...extraProps}
            className={classNames({ blk, elt: 'box', mods: [category] })}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            name={name}
            ref={ref}
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
})

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
  ref: oneOfType([func, object]),
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
  ref: null,
}

export default memo(Input)
