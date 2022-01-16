import React, { useState, useEffect } from 'react'
import { classNames } from '@common/helpers'
import {
  arrayOf, shape, string, oneOf, func,
} from 'prop-types'

import { Button } from '@common'

import './_style.scss'

const blk = 'cosmic-tabs'

const Tabs = ({
  borderAlight, direction, tabs, defaultSelected, className, handleTabChange,
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
    mods: [direction, borderAlight],
  })

  return (
    <div className={eltClassName}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key

        return (
          <Button
            className={classNames({
              blk,
              elt: 'label',
              mods: [
                isActive && 'active',
                direction,
                borderAlight,
              ],
            })}
            name={tab.key}
            category="plain"
            onClick={handleTabClick}
          >
            {tab.value}
          </Button>
        )
      })}
    </div>
  )
}

Tabs.propTypes = {
  borderAlight: oneOf(['right', 'left', 'top', 'bottom']),
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
  borderAlight: 'bottom',
  direction: 'horizontal',
  tabs: [],
  defaultSelected: '',
  className: '',
}

export default Tabs
