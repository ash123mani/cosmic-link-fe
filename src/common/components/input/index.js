/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, forwardRef, useRef } from 'react'
import {
  string, func, oneOf, shape, object, oneOfType,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-input'
let inputUid = 0

const Input = forwardRef((props, ref) => {
  const {
    className, placeholder, label, errorMessage, type, onChange, name, category, as, id, ...extraProps
  } = props
  const generatedIdRef = useRef(null)
  if (!generatedIdRef.current) {
    inputUid += 1
    generatedIdRef.current = `cosmic-input-${inputUid}`
  }
  const inputId = id || name || generatedIdRef.current
  const errorId = `${inputId}-error`
  const eltClassName = classNames({
    blk,
    className,
    mods: [
      errorMessage && 'error',
      category,
    ],
  })
  const sharedProps = {
    ...extraProps,
    id: inputId,
    className: classNames({ blk, elt: 'box', mods: [category] }),
    placeholder,
    onChange,
    type,
    name,
    ref,
    'aria-invalid': !!errorMessage,
    'aria-describedby': errorMessage ? errorId : undefined,
  }

  return (
    <div className={eltClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className={classNames({ blk, elt: 'label', mods: [category] })}
        >
          {label}
        </label>
      )}
      {as === 'textarea' ? <textarea {...sharedProps} /> : <input {...sharedProps} />}

      {errorMessage && (
        <div id={errorId} className={classNames({ blk, elt: 'error' })} role="status">
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
  id: string,
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
  id: undefined,
}

export default memo(Input)
