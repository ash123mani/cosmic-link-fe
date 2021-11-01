import identity from 'lodash/identity'
import uniq from 'lodash/uniq'
import flatten from 'lodash/flatten'

const cache = {}

const makeClassList = ({ baseClass, modifiers = [] }) => {
  if (!baseClass || typeof baseClass !== 'string') {
    return baseClass
  }

  const mods = modifiers.filter(identity)
  const modifierClasses = mods.map((mod) => `${baseClass}--${mod}`)

  return [baseClass, ...modifierClasses].join(' ')
}

const classNames = ({
  blk, elt, mix, mods = [], className,
}) => {
  const cacheKey = `${blk}-${elt}-${Array.from(mods || []).join('-')}-${mix}-${className}`
  const fromCache = cache[cacheKey]
  if (fromCache) {
    return fromCache
  }

  const classes = []

  if (blk && elt) {
    classes.push(`${blk}__${elt}`)
  }

  if (blk && elt && mix) {
    const autoMix = `${mix}__${elt}`
    classes.push(autoMix)

    if (mods.length) {
      classes.push(makeClassList({
        baseClass: autoMix,
        modifiers: mods,
      }))
    }
  }

  if (!classes.length) {
    classes.push(blk)
  }

  if (mods.length) {
    classes[0] = makeClassList({
      baseClass: classes[0],
      modifiers: mods,
    })
  }

  if (className) {
    classes.push(className)
  }

  const parsed = uniq(flatten(classes.map((cls) => cls.split(' ')))).join(' ')
  cache[cacheKey] = parsed
  return parsed
}

export default classNames
