import React from 'react'
import { bool } from 'prop-types'

import { classNames } from '@common/helpers'
import { Spinner } from '@common'

import LinkCards from './link-cards'

import './_style.scss'

const blk = 'links-list'

const LinksList = ({ isFetchingLinks }) => {
  const renderContent = () => {
    if (isFetchingLinks) {
      return (
        <Spinner
          center
          text="Fetching Links..."
        />
      )
    }

    return <LinkCards />
  }

  return (
    <div className={classNames({ blk })}>
      {renderContent()}
    </div>
  )
}
LinksList.propTypes = {
  isFetchingLinks: bool,
}

LinksList.defaultProps = {
  isFetchingLinks: false,
}

export default LinksList
