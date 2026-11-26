const trim = (value) => (typeof value === 'string' ? value.trim() : '')

export const EDIT_LINK_MODES = {
  PERSONAL: 'personal',
  MANAGED: 'managed',
}

export const getEditLinkMode = ({ folderId, linkId }) => (
  folderId && linkId ? EDIT_LINK_MODES.MANAGED : EDIT_LINK_MODES.PERSONAL
)

export const getEditLinkBackPath = ({ mode, folderId, from }) => {
  if (from) {
    return from
  }
  return mode === EDIT_LINK_MODES.MANAGED ? `/managed/${folderId}` : '/links'
}

export const getPersonalFormValues = (link) => ({
  title: link?.title || '',
  description: link?.description || '',
})

export const getManagedFormValues = (link) => ({
  title: link?.title || '',
  description: link?.description || '',
})

export const validateEditLinkForm = (values) => {
  const errors = {}
  if (!trim(values.title)) {
    errors.title = 'Title is required'
  }
  return errors
}

export const hasEditLinkChanges = (initial, current) => (
  trim(initial?.title) !== trim(current?.title)
  || (initial?.description || '') !== (current?.description || '')
)

export const buildPersonalEditPayload = ({ id, values }) => ({
  id,
  title: trim(values.title),
  description: values.description || '',
})

export const buildManagedEditPayload = (values) => ({
  title: trim(values.title),
  description: values.description || '',
})
