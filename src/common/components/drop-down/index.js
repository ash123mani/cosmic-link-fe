/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react'
import {
  oneOf, string, shape, arrayOf,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-dropdown'

const DropDown = ({
  category, className, defaultSelected, list, label,
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [selected, setSelected] = useState(defaultSelected)

  const eltClassName = classNames({
    blk,
    className,
    mods: [category],
  })

  const handleDropDownClick = () => {
    setShowDropDown(!showDropDown)
  }

  const handleSelectedItemChange = (item) => {
    setSelected(item)
    handleDropDownClick()
  }

  if (!list.length) {
    return null
  }

  return (
    <div className={eltClassName}>
      {label && (
        <div
          className={classNames({ blk, elt: 'label', mods: [category] })}
        >
          Select a category:
        </div>
      )}

      <div
        className={classNames({ blk, elt: 'selected', mods: [category] })}
        onClick={handleDropDownClick}
        onKeyDown={handleDropDownClick}
        role="button"
      >
        {selected.value || 'Select'}
      </div>

      <div className={classNames({
        blk,
        elt: 'content',
        mods: [category, showDropDown && 'show'],
      })}
      >
        {list.map((item) => (
          <div
            className={classNames({ blk, elt: 'item', mods: [category] })}
            key={item.key}
            onClick={(e) => handleSelectedItemChange(item, e)}
            onKeyDown={(e) => handleSelectedItemChange(item, e)}
            role="button"
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  )
}

DropDown.propTypes = {
  category: oneOf(['dark', 'light']),
  className: string,
  defaultSelected: string,
  list: arrayOf(shape({
    value: string,
    key: string,
  })),
  label: string,
}

DropDown.defaultProps = {
  category: 'dark',
  className: '',
  defaultSelected: {},
  label: '',
  list: [],
}

export default DropDown
