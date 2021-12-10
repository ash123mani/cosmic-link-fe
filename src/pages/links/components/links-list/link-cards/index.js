import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, shape, string } from 'prop-types'

import { classNames } from '@common/helpers'
import LinkCard from '@local/link-card'

import { mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'link-cards'

const LinkCards = ({ categoryLinks }) => (
  <div className={classNames({ blk })}>
    {categoryLinks.map((link) => {
      const {
        title, description, imageUrl, siteName, linkUrl,
      } = link

      return (
        <LinkCard
          title={title}
          imageUrl={imageUrl}
          description={description}
          siteName={siteName}
          linkUrl={linkUrl}
        />
      )
    })}
  </div>
)

LinkCards.propTypes = {
  categoryLinks: arrayOf(shape({
    title: string,
    description: string,
    siteName: string,
    imageUrl: string,
    category: shape({
      id: string,
      name: string,
    }),
    linkUrl: string,
  })),
}

LinkCards.defaultProps = {
  categoryLinks: [],
}

const LinkCardsWithConnect = connect(
  mapStateToProps,
)(LinkCards)

export default LinkCardsWithConnect
