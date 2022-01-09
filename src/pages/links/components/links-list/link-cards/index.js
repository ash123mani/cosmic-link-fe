import React from 'react'
import { connect } from 'react-redux'
import {
  arrayOf, shape, string, func,
} from 'prop-types'

import { classNames } from '@common/helpers'
import LinkCard from '@local/link-card'

import { mapStateToProps, actions } from './index.connect'
import './_style.scss'

const blk = 'link-cards'

const LinkCards = ({ categoryLinks, setAppBanner, deleteLink }) => {
  const handleLinkCopyClick = () => {
    setAppBanner({
      type: 'info',
      message: 'Link Url copied succesfully',
    })
  }

  const handleDeleteClick = async (linkId) => {
    const { success } = await deleteLink(linkId)
    const link = categoryLinks.filter((link) => link.id === linkId)[0]
    if (success) {
      setAppBanner({
        type: 'info',
        message: `${link.title} of ${link.category.name} deleted succesfully`,
      })
    }
  }

  return (
    <div className={classNames({ blk })}>
      {categoryLinks.map((link) => {
        const {
          title, description, imageUrl, siteName, linkUrl, id,
        } = link

        return (
          <LinkCard
            title={title}
            imageUrl={imageUrl}
            description={description}
            siteName={siteName}
            linkUrl={linkUrl}
            onLinkCopy={handleLinkCopyClick}
            onLinkDelete={handleDeleteClick}
            linkId={id}
            key={id}
          />
        )
      })}
    </div>
  )
}

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
  setAppBanner: func.isRequired,
  deleteLink: func.isRequired,
}

LinkCards.defaultProps = {
  categoryLinks: [],
}

const LinkCardsWithConnect = connect(
  mapStateToProps, actions,
)(LinkCards)

export default LinkCardsWithConnect
