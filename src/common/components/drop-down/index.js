/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  useState, memo, useRef, useEffect, useCallback,
} from 'react'
import {
  oneOf, string, shape, arrayOf, func,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-dropdown'

const DropDown = ({
  category,
  className,
  defaultSelected,
  list,
  label,
  handleChange,
  renderItem,
  isOpen,
  onOpenChange,
  emptyText,
  loading,
  selectedLabel,
  closeOnSelect,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [selected, setSelected] = useState(defaultSelected)
  const [menuStyle, setMenuStyle] = useState({})
  const ref = useRef(null)
  const contentRef = useRef(null)

  const showDropDown = isOpen !== undefined ? isOpen : internalOpen

  const setOpen = useCallback((next) => {
    if (isOpen === undefined) {
      setInternalOpen(next)
    }
    if (onOpenChange) {
      onOpenChange(next)
    }
  }, [isOpen, onOpenChange])

  const updateMenuPosition = useCallback(() => {
    if (!ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom - 8
    const spaceAbove = rect.top - 8
    const openUp = spaceBelow < 180 && spaceAbove > spaceBelow
    const maxHeight = Math.max(120, Math.min(240, openUp ? spaceAbove : spaceBelow))
    setMenuStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      top: openUp ? undefined : rect.bottom + 4,
      bottom: openUp ? window.innerHeight - rect.top + 4 : undefined,
      maxHeight,
      zIndex: 1400,
    })
  }, [])

  useEffect(() => {
    if (!showDropDown) {
      return undefined
    }
    updateMenuPosition()
    const handle = () => updateMenuPosition()
    window.addEventListener('resize', handle)
    window.addEventListener('scroll', handle, true)
    return () => {
      window.removeEventListener('resize', handle)
      window.removeEventListener('scroll', handle, true)
    }
  }, [showDropDown, updateMenuPosition, list.length, loading])

  useEffect(() => {
    if (!showDropDown) {
      return undefined
    }
    const handleClick = (e) => {
      if (ref.current?.contains(e.target) || contentRef.current?.contains(e.target)) {
        return
      }
      setOpen(false)
    }
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [showDropDown, setOpen])

  const categoryMod = { mods: [category] }
  const eltClassName = classNames({
    blk,
    className,
    ...categoryMod,
  })

  const handleDropDownClick = () => {
    setOpen(!showDropDown)
  }

  const handleSelectedItemChange = (item) => {
    setSelected(item)
    if (closeOnSelect) {
      setOpen(false)
    }
    handleChange(item)
  }

  useEffect(() => {
    setSelected(defaultSelected)
  }, [defaultSelected])

  if (!loading && !list.length && !emptyText) {
    return null
  }

  const resolvedSelectedLabel = selectedLabel !== undefined
    ? selectedLabel
    : ((selected && (selected.value || selected.label)) || 'Select')

  return (
    <div
      className={eltClassName}
      ref={ref}
    >
      {label && (
        <div
          className={classNames({ blk, elt: 'label', ...categoryMod })}
        >
          {label}
        </div>
      )}

      <div
        className={classNames({ blk, elt: 'selected', mods: [category, showDropDown && 'open'] })}
        onClick={handleDropDownClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleDropDownClick()
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={!!showDropDown}
      >
        {resolvedSelectedLabel}
      </div>

      <div
        ref={contentRef}
        style={showDropDown ? menuStyle : undefined}
        className={classNames({
          blk,
          elt: 'content',
          mods: [category, showDropDown && 'show'],
        })}
      >
        {loading && (
          <div className={classNames({ blk, elt: 'status', ...categoryMod })}>Loading...</div>
        )}
        {!loading && !list.length && emptyText && (
          <div className={classNames({ blk, elt: 'status', ...categoryMod })}>{emptyText}</div>
        )}
        {!loading && list.map((item) => (
          <div
            className={classNames({ blk, elt: 'item', ...categoryMod })}
            key={item.key || item.id}
            onMouseDown={(e) => {
              e.preventDefault()
              handleSelectedItemChange(item)
            }}
            role="button"
            tabIndex={0}
          >
            {renderItem ? renderItem(item) : (
              <>
                <span className={classNames({ blk, elt: 'item-label' })}>
                  {item.value || item.label}
                </span>
                {(item.subLabel || item.email) && (
                  <span className={classNames({ blk, elt: 'item-sub' })}>
                    {item.subLabel || item.email}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

DropDown.propTypes = {
  category: oneOf(['dark', 'light']),
  className: string,
  defaultSelected: shape({
    key: string,
    value: string,
  }),
  list: arrayOf(shape({
    value: string,
    key: string,
    id: string,
    label: string,
  })),
  label: string,
  handleChange: func.isRequired,
  renderItem: func,
  isOpen: oneOf([true, false, undefined]),
  onOpenChange: func,
  emptyText: string,
  loading: oneOf([true, false]),
  selectedLabel: string,
  closeOnSelect: oneOf([true, false]),
}

DropDown.defaultProps = {
  category: 'dark',
  className: '',
  defaultSelected: {},
  label: '',
  list: [],
  renderItem: null,
  isOpen: undefined,
  onOpenChange: null,
  emptyText: '',
  loading: false,
  selectedLabel: undefined,
  closeOnSelect: true,
}

export default memo(DropDown)
