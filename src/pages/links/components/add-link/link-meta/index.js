import React from 'react'
import { shape, string } from 'prop-types'

import { Input } from '@common'

const LinkMeta = ({ meta }) => {
  const { title, description } = meta

  return (
    <div>
      <Input
        placeholder="Title"
        category="light"
        label="Title"
        as="textarea"
        rows="2"
        name="title"
        value={title}
      />
      <Input
        placeholder="Description"
        category="light"
        label="Description"
        as="textarea"
        rows="3"
        name="description"
        value={description}
      />
    </div>
  )
}

LinkMeta.propTypes = {
  meta: shape({
    siteName: string,
    title: string,
    description: string,
    url: string,
    imageUrl: string,
  }),
}

LinkMeta.defaultProps = {
  meta: {},
}

export default LinkMeta
