const getCategoryLinkCount = (state, categoryId) => {
  const entry = state.links.collection[categoryId]
  if (!entry || !entry.isFetched) {
    return null
  }
  return (entry.links || []).length
}

export default getCategoryLinkCount
