import {
  useCallback, useEffect, useMemo, useState,
} from 'react'

import { api } from '@api'
import { canMutateManagedLink } from '@pages/managed-folders/utils'

import {
  EDIT_LINK_MODES,
  buildManagedEditPayload,
  buildPersonalEditPayload,
  getManagedFormValues,
  getPersonalFormValues,
  hasEditLinkChanges,
  validateEditLinkForm,
} from '../utils'

const INITIAL_FORM = { title: '', description: '' }

const getPersonalLink = async (id) => {
  const res = await api('getAllLinks')
  if (!res?.success) {
    return { error: res?.data?.error || 'Could not load link' }
  }
  const link = (res.data?.links || []).find((item) => String(item.id) === String(id))
  return link ? { link } : { error: 'Link not found' }
}

const getManagedLink = async ({
  folderId, linkId, getManagedFolder, getManagedFolderLinks,
}) => {
  const [folderRes, linksRes] = await Promise.all([
    getManagedFolder(folderId),
    getManagedFolderLinks(folderId),
  ])
  const folderOk = folderRes?.type?.endsWith('_SUCCESS') || folderRes?.success
  const linksOk = linksRes?.type?.endsWith('_SUCCESS') || linksRes?.success
  if (!folderOk || !linksOk) {
    return { error: folderRes?.payload?.message || linksRes?.payload?.message || 'Could not load link' }
  }
  const links = linksRes?.payload?.links || linksRes?.data?.links || []
  const link = links.find((item) => String(item.id) === String(linkId))
  return link ? { link } : { error: 'Link not found' }
}

const useEditLink = ({
  mode, id, folderId, linkId, managedFolder, managedLinks, currentUserId,
  updateLink, updateManagedFolderLink, getManagedFolder, getManagedFolderLinks, setAppBanner,
  onSuccess,
}) => {
  const isManaged = mode === EDIT_LINK_MODES.MANAGED
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [initialForm, setInitialForm] = useState(INITIAL_FORM)
  const [form, setForm] = useState(INITIAL_FORM)

  const isDirty = useMemo(() => hasEditLinkChanges(initialForm, form), [initialForm, form])
  const canEdit = !isManaged || canMutateManagedLink(managedFolder, link, currentUserId)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setError('')
      const result = isManaged
        ? await getManagedLink({
          folderId, linkId, getManagedFolder, getManagedFolderLinks,
        })
        : await getPersonalLink(id)
      if (cancelled) {
        return
      }
      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }
      const next = isManaged ? getManagedFormValues(result.link) : getPersonalFormValues(result.link)
      setLink(result.link)
      setForm(next)
      setInitialForm(next)
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [isManaged, id, folderId, linkId, getManagedFolder, getManagedFolderLinks])

  useEffect(() => {
    if (!isManaged || !linkId) {
      return
    }
    const found = (managedLinks || []).find((item) => String(item.id) === String(linkId))
    if (found) {
      setLink(found)
    }
  }, [isManaged, linkId, managedLinks])

  const handleChange = useCallback(({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev))
  }, [])

  const saveManaged = async () => {
    const res = await updateManagedFolderLink(folderId, linkId, buildManagedEditPayload(form))
    const ok = res?.type?.endsWith('_SUCCESS') || res?.success
    if (ok) {
      setAppBanner({ type: 'info', message: 'Link updated' })
      onSuccess()
      return
    }
    setError(res?.payload?.message || res?.data?.error || 'Could not update link')
  }

  const savePersonal = async () => {
    const res = await updateLink(buildPersonalEditPayload({ id, values: form }))
    if (res?.success) {
      setAppBanner({ type: 'info', message: 'Link updated successfully' })
      onSuccess()
      return
    }
    setError(res?.data?.error || res?.payload?.message || 'Could not update link')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!link || saving) {
      return
    }
    const nextErrors = validateEditLinkForm(form)
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSaving(true)
    setError('')
    if (isManaged) {
      await saveManaged()
    } else {
      await savePersonal()
    }
    setSaving(false)
  }

  return {
    link, loading, saving, error, fieldErrors, form, isDirty, canEdit, handleChange, handleSubmit,
  }
}

export default useEditLink
