import React from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import LinkCard from '@local/link-card'

import './_style.scss'

const blk = 'managed-link-card'

const ManagedLinkCard = ({
  link, canMutate, onEdit, onDelete, onCopy,
}) => (
  <div className={classNames({ blk })}>
    <LinkCard
      imageUrl={link.imageUrl}
      title={link.title}
      description={link.description}
      siteName={link.siteName}
      linkUrl={link.linkUrl}
      linkId={link.id}
      onLinkCopy={onCopy}
      onLinkDelete={() => onDelete(link)}
      onLinkEdit={canMutate ? () => onEdit(link) : null}
      canDelete={canMutate}
    />
    <div className={classNames({ blk, elt: 'meta' })}>
      {`Added by ${link.createdBy?.username || 'member'}`}
      {link.lastEditedBy?.username ? ` · Edited by ${link.lastEditedBy.username}` : ''}
    </div>
  </div>
)

ManagedLinkCard.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string,
    linkUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    siteName: PropTypes.string,
    imageUrl: PropTypes.string,
    createdBy: PropTypes.shape({ id: PropTypes.string, username: PropTypes.string }),
    lastEditedBy: PropTypes.shape({ username: PropTypes.string }),
  }).isRequired,
  canMutate: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
}

ManagedLinkCard.defaultProps = {
  canMutate: false,
  onCopy: () => {},
}

export default ManagedLinkCard
