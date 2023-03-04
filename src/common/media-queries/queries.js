import { breakpoints } from './breakpoints'

const queries = {
  'small-up': `(min-width: ${breakpoints.small}px)`,
  'small-only': `(min-width: ${breakpoints.small}px) and (max-width: ${breakpoints.medium - 1}px)`,
  'small-down': `(max-width: ${breakpoints.medium - 1}px)`,
  'medium-up': `(min-width: ${breakpoints.medium}px)`,
  'medium-only': `(min-width: ${breakpoints.medium}px) and (max-width: ${breakpoints.large - 1}px)`,
  'medium-down': `(max-width: ${breakpoints.large - 1}px)`,
  'large-up': `(min-width: ${breakpoints.large}px)`,
  'large-only': `(min-width: ${breakpoints.large}px) and (max-width: ${breakpoints.xlarge - 1}px)`,
  'large-down': `(max-width: ${breakpoints.xlarge - 1}px)`,
  'xlarge-up': `(min-width: ${breakpoints.xlarge}px)`,
}

export default queries
