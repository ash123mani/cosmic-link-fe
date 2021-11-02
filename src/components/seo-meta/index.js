import React from 'react'
import { Helmet } from 'react-helmet'
import { string } from 'prop-types'

const canonical = window.location.href

const SeoMeta = ({ displayName, content }) => (
  <Helmet>
    <title>{`${displayName} - CosmicLink`}</title>
    (
    { content
      ? <meta name="description" content={content} />
      : <meta name="description" content="One place for all your Links - CosmicLink" />}
    )
    <link rel="canonical" href={canonical} />
    <meta name="robots" content="index, follow" />
  </Helmet>
)

SeoMeta.propTypes = {
  displayName: string.isRequired,
  content: string,
}

SeoMeta.defaultProps = {
  content: '',
}

export default SeoMeta
