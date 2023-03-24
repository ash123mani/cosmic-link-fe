import React, { useState, useEffect } from 'react'
import { classNames } from '@common/helpers'
import {
  arrayOf, shape, string, oneOf, func,
} from 'prop-types'

import { Button } from '@common'

import './_style.scss'

const blk = 'cosmic-tabs'

const Tabs = ({
  direction, tabs, defaultSelected, className, handleTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultSelected)

  useEffect(() => {
    setActiveTab(defaultSelected)
  }, [defaultSelected])

  const handleTabClick = ({ target: { name } }) => {
    setActiveTab(name)
    handleTabChange(name)
  }

  const eltClassName = classNames({
    blk,
    className,
    mods: [direction],
  })

  return (
    <div className={eltClassName}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key

        return (
          <div className={classNames({ blk, elt: 'btn-wrapper' })}>
            <Button
              className={classNames({
                blk,
                elt: 'btn',
                mods: [
                  isActive && 'active',
                  direction,
                ],
              })}
              name={tab.key}
              category="plain"
              key={tab.key}
              onClick={handleTabClick}
            >
              {tab.value}
              {/* <span
              name={tab.key}
              onClick={handleTabClick}
              onKeyDown={handleTabClick}
              className={classNames({
                blk,
                elt: 'label',
                mods: [
                  direction,
                ],
              })}
              role="button"
              tabIndex={0}
            >
              {tab.value}

            </span> */}
            </Button>
          </div>

        )
      })}
    </div>
  )
}

Tabs.propTypes = {
  direction: oneOf(['vertical', 'horizontal']),
  tabs: arrayOf(shape({
    value: string,
    key: string,
  })),
  defaultSelected: string,
  className: string,
  handleTabChange: func.isRequired,
}

Tabs.defaultProps = {
  direction: 'horizontal',
  tabs: [],
  defaultSelected: '',
  className: '',
}

export default Tabs
