import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { classNames } from '@common/helpers'
import { Input, Modal } from '@common'
import ConfirmationButtons from '@local/confirmation-buttons'
import AddLinkModal from '@local/add-link-modal'

import './_style.scss'

const blk = 'managed-link-modal'

const emptyForm = {
  linkUrl: '', title: '', description: '', imageUrl: '', siteName: '',
}

const AddEditLinkModal = ({
  isOpen, onClose, onSubmit, isSubmitting, link,
}) => {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setForm(emptyForm)
      setError('')
      return
    }
    setForm({
      linkUrl: link?.linkUrl || '',
      title: link?.title || '',
      description: link?.description || '',
      imageUrl: link?.imageUrl || '',
      siteName: link?.siteName || '',
    })
    setError('')
  }, [isOpen, link])

  if (!isOpen) {
    return null
  }

  if (!link) {
    return (
      <AddLinkModal
        onClose={onClose}
        onSubmit={async (meta) => onSubmit({
          linkUrl: meta.linkUrl,
          title: meta.title,
          description: meta.description,
          imageUrl: meta.imageUrl || '',
          siteName: meta.siteName || '',
        })}
        categories={[]}
        title="Add link"
      />
    )
  }

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.linkUrl.trim() || !form.title.trim()) {
      setError('URL and title are required')
      return
    }
    const res = await onSubmit({
      linkUrl: form.linkUrl.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      siteName: form.siteName.trim(),
    })
    if (!res?.type?.endsWith('_SUCCESS')) {
      setError(res?.payload?.message || 'Unable to save link')
    }
  }

  return (
    <Modal.Wrapper onEscKeydown={() => !isSubmitting && onClose()}>
      <Modal.Header closeAble={!isSubmitting} onClose={onClose}>Edit link</Modal.Header>
      <Modal.Content>
        <form onSubmit={handleSubmit} className={classNames({ blk })}>
          <Input name="linkUrl" label="URL" category="light" value={form.linkUrl} onChange={handleChange('linkUrl')} placeholder="https://..." />
          <Input name="title" label="Title" category="light" value={form.title} onChange={handleChange('title')} placeholder="Link title" />
          <Input
            name="description"
            label="Description"
            category="light"
            as="textarea"
            rows="4"
            value={form.description}
            onChange={handleChange('description')}
            placeholder="Optional description"
          />
          {error && <div className={classNames({ blk, elt: 'error' })}>{error}</div>}
          <ConfirmationButtons handleCancel={onClose} isSubmitting={isSubmitting} confirmText="Save changes" cancelText="Cancel" submitButtonType="submit" />
        </form>
      </Modal.Content>
    </Modal.Wrapper>
  )
}

AddEditLinkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  link: PropTypes.shape({
    linkUrl: PropTypes.string, title: PropTypes.string, description: PropTypes.string, imageUrl: PropTypes.string, siteName: PropTypes.string,
  }),
}

AddEditLinkModal.defaultProps = { isSubmitting: false, link: null }

export default AddEditLinkModal
