/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  memo, useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import {
  arrayOf, bool, func, oneOf, shape, string,
} from 'prop-types'

import { classNames } from '@common/helpers'

import './_style.scss'

const blk = 'cosmic-multi-select-dropdown'

const getOptionKey = (option) => String(option.key || option.id || option.value || option.label || '')
const getOptionLabel = (option) => option.value || option.label || ''
const getOptionSubLabel = (option) => option.subLabel || option.email || ''

const MultiSelectDropDown = ({
  category,
  className,
  label,
  options,
  selected,
  onChange,
  onSearchChange,
  searchValue,
  placeholder,
  emptyText,
  loading,
  disabled,
  isOpen,
  onOpenChange,
  closeOnSelect,
  renderOption,
  maxVisibleChips,
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [internalSearch, setInternalSearch] = useState('')
  const [menuStyle, setMenuStyle] = useState({})
  const ref = useRef(null)
  const contentRef = useRef(null)

  const open = isOpen !== undefined ? isOpen : internalOpen
  const query = onSearchChange ? searchValue : internalSearch
  const categoryMod = { mods: [category] }

  const selectedKeys = useMemo(
    () => new Set((selected || []).map((item) => getOptionKey(item))),
    [selected],
  )

  const visibleChips = (selected || []).slice(0, maxVisibleChips)
  const hiddenCount = Math.max((selected || []).length - visibleChips.length, 0)

  const setOpen = useCallback((next) => {
    if (disabled) {
      return
    }
    if (isOpen === undefined) {
      setInternalOpen(next)
    }
    if (onOpenChange) {
      onOpenChange(next)
    }
  }, [disabled, isOpen, onOpenChange])

  const updateMenuPosition = useCallback(() => {
    if (!ref.current) {
      return
    }
    const rect = ref.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom - 8
    const spaceAbove = rect.top - 8
    const openUp = spaceBelow < 220 && spaceAbove > spaceBelow
    const maxHeight = Math.max(140, Math.min(320, openUp ? spaceAbove : spaceBelow))
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
    if (!open) {
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
  }, [open, updateMenuPosition, (options || []).length, loading])

  useEffect(() => {
    if (!open) {
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
  }, [open, setOpen])

  const handleSearch = (e) => {
    const { value } = e.target
    if (onSearchChange) {
      onSearchChange(value)
      return
    }
    setInternalSearch(value)
  }

  const toggleOption = (option) => {
    if (option.disabled) {
      return
    }
    const key = getOptionKey(option)
    const exists = selectedKeys.has(key)
    const next = exists
      ? (selected || []).filter((item) => getOptionKey(item) !== key)
      : [...(selected || []), option]
    onChange(next)
    if (closeOnSelect) {
      setOpen(false)
    }
  }

  const removeSelected = (option) => {
    const key = getOptionKey(option)
    onChange((selected || []).filter((item) => getOptionKey(item) !== key))
  }

  const triggerLabel = (selected || []).length
    ? `${selected.length} selected`
    : placeholder

  return (
    <div
      ref={ref}
      className={classNames({
        blk, className, ...categoryMod, mods: [category, disabled && 'disabled'],
      })}
    >
      {label && (
        <div className={classNames({ blk, elt: 'label', ...categoryMod })}>
          {label}
        </div>
      )}

      <button
        type="button"
        className={classNames({ blk, elt: 'trigger', ...categoryMod })}
        onClick={() => setOpen(!open)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={classNames({ blk, elt: 'trigger-label', mods: [!(selected || []).length && 'placeholder'] })}>
          {triggerLabel}
        </span>
        <span className={classNames({ blk, elt: 'caret', mods: [open && 'open'] })} />
      </button>

      {(selected || []).length > 0 && (
        <div className={classNames({ blk, elt: 'chips' })}>
          {visibleChips.map((item) => (
            <span key={getOptionKey(item)} className={classNames({ blk, elt: 'chip', ...categoryMod })}>
              <span className={classNames({ blk, elt: 'chip-label' })}>{getOptionLabel(item)}</span>
              <button
                type="button"
                className={classNames({ blk, elt: 'chip-remove' })}
                onClick={() => removeSelected(item)}
                aria-label={`Remove ${getOptionLabel(item)}`}
              >
                ×
              </button>
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className={classNames({ blk, elt: 'chip', mods: [category, 'count'] })}>
              +
              {hiddenCount}
            </span>
          )}
        </div>
      )}

      <div
        ref={contentRef}
        style={open ? menuStyle : undefined}
        className={classNames({
          blk, elt: 'content', mods: [category, open && 'show'],
        })}
        role="listbox"
        aria-multiselectable="true"
      >
        <div className={classNames({ blk, elt: 'search-wrap' })}>
          <input
            className={classNames({ blk, elt: 'search', ...categoryMod })}
            value={query || ''}
            onChange={handleSearch}
            placeholder="Search..."
            aria-label={label || 'Search options'}
          />
        </div>

        {loading && <div className={classNames({ blk, elt: 'status', ...categoryMod })}>Loading...</div>}
        {!loading && !(options || []).length && (
          <div className={classNames({ blk, elt: 'status', ...categoryMod })}>{emptyText}</div>
        )}
        {!loading && (options || []).map((option) => {
          const key = getOptionKey(option)
          const isSelected = selectedKeys.has(key)
          return (
            <button
              type="button"
              key={key}
              className={classNames({
                blk, elt: 'option', mods: [category, isSelected && 'selected', option.disabled && 'disabled'],
              })}
              onClick={() => toggleOption(option)}
              role="option"
              aria-selected={isSelected}
              disabled={option.disabled}
            >
              <span className={classNames({ blk, elt: 'checkbox', mods: [isSelected && 'checked'] })} aria-hidden="true" />
              <span className={classNames({ blk, elt: 'option-text' })}>
                {renderOption ? renderOption(option, { selected: isSelected }) : (
                  <>
                    <span className={classNames({ blk, elt: 'option-label' })}>{getOptionLabel(option)}</span>
                    {getOptionSubLabel(option) && (
                      <span className={classNames({ blk, elt: 'option-sub' })}>{getOptionSubLabel(option)}</span>
                    )}
                  </>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

MultiSelectDropDown.propTypes = {
  category: oneOf(['dark', 'light']),
  className: string,
  label: string,
  options: arrayOf(shape({})),
  selected: arrayOf(shape({})),
  onChange: func.isRequired,
  onSearchChange: func,
  searchValue: string,
  placeholder: string,
  emptyText: string,
  loading: bool,
  disabled: bool,
  isOpen: bool,
  onOpenChange: func,
  closeOnSelect: bool,
  renderOption: func,
  maxVisibleChips: Number,
}

MultiSelectDropDown.defaultProps = {
  category: 'dark',
  className: '',
  label: '',
  options: [],
  selected: [],
  onSearchChange: null,
  searchValue: '',
  placeholder: 'Select options',
  emptyText: 'No options found',
  loading: false,
  disabled: false,
  isOpen: undefined,
  onOpenChange: null,
  closeOnSelect: false,
  renderOption: null,
  maxVisibleChips: 4,
}

export default memo(MultiSelectDropDown)
