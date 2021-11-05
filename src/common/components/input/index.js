import React from 'react'
import { string } from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-input'

const Input = ({
  className, placeholder, id, label, errorMessage, type,
}) => {
  const eltClassName = classNames({
    blk,
    className,
    mods: [errorMessage && 'error'],
  })

  return (
    <div className={eltClassName}>
      {label && (
        <label
          htmlFor={id}
          className={classNames({ blk, elt: 'label' })}
        >
          {label}
        </label>
      )}
      <input
        className={classNames({ blk, elt: 'box' })}
        placeholder={placeholder}
        type={type}
        id={id}
      />
      {errorMessage && (
        <div className={classNames({ blk, elt: 'error' })}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

Input.propTypes = {
  className: string,
  placeholder: string,
  id: string.isRequired,
  label: string,
  errorMessage: string,
  type: string,
}

Input.defaultProps = {
  className: '',
  placeholder: '',
  label: '',
  errorMessage: '',
  type: 'text',
}

export default Input
