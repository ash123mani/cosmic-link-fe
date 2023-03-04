import queries from './queries'

const smallUp = { query: queries['small-up'] }
const smallOnly = { query: queries['small-only'] }
const smallDown = { query: queries['small-down'] }
const mediumUp = { query: queries['medium-up'] }
const mediumOnly = { query: queries['medium-only'] }
const mediumDown = { query: queries['medium-down'] }
const largeUp = { quey: queries['large-up'] }
const largeOnly = { query: queries['large-only'] }
const largeDown = { query: queries['large-down'] }
const xlargeUp = { query: queries['xlarge-up'] }

const mediaQueries = {
  smallUp,
  smallOnly,
  smallDown,
  mediumUp,
  mediumOnly,
  mediumDown,
  largeUp,
  largeOnly,
  largeDown,
  xlargeUp,
}

export default mediaQueries
