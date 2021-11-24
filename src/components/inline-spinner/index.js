import React from 'react'
import { oneOf, string } from 'prop-types'

import { Spinner } from '@common'

const InlineSpinner = ({ text, size, category }) => (
  <Spinner
    size={size}
    text={text}
    category={category}
    inline
  />
)

InlineSpinner.propTypes = {
  category: oneOf(['primary', 'primary-light', 'primary-medium', 'gray', 'black']),
  size: oneOf(['large', 'medium', 'small']),
  text: string,
}

InlineSpinner.defaultProps = {
  text: 'Submitting..',
  category: 'primary',
  size: 'small',
}

export default InlineSpinner
