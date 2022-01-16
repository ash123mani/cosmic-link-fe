import React from 'react'
import {
  bool, string, arrayOf, shape,
} from 'prop-types'

import { classNames } from '@common/helpers'
import { Spinner } from '@common'

import LinkCards from './link-cards'

import './_style.scss'

const blk = 'links-list'

const LinksList = ({ isFetchingLinks, categoryLinks }) => {
  const renderContent = () => {
    if (isFetchingLinks) {
      return (
        <Spinner
          center
          text="Fetching Links..."
        />
      )
    }

    return <LinkCards categoryLinks={categoryLinks} />
  }

  return (
    <div className={classNames({ blk })}>
      {renderContent()}
    </div>
  )
}
LinksList.propTypes = {
  isFetchingLinks: bool,
  categoryLinks: arrayOf(shape({
    title: string,
    description: string,
    siteName: string,
    imageUrl: string,
    category: shape({
      id: string,
      name: string,
    }),
  })),
}

LinksList.defaultProps = {
  isFetchingLinks: false,
  categoryLinks: [],
}

export default LinksList
