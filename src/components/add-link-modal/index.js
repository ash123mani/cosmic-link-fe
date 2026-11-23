import React, { useState } from 'react'
import {
  func, string, arrayOf, shape,
} from 'prop-types'
import { connect } from 'react-redux'

import { Modal, Input } from '@common'
import { classNames } from '@common/helpers'
import ConfirmationButtons from '@local/confirmation-buttons'
import { getLinkMeta as getLinkMetaAction } from '@state/actions/links'

import LinkMeta from './link-meta'
import './_style.scss'

const blk = 'add-link-modal'

const AddLinkModal = ({
  onClose,
  onSubmit,
  getLinkMeta,
  categories,
  defaultCategoryId,
  confirmText,
  title,
}) => {
  const defaultCategory = categories.find((c) => c.key === defaultCategoryId) || categories[categories.length - 1]
  const [linkUrl, setLinkUrl] = useState('')
  const [isFetchingMeta, setIsFetchingMeta] = useState(false)
  const [isFetchedMeta, setIsFetchedMeta] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [linkMeta, setLinkMeta] = useState({
    title: '',
    description: '',
    linkUrl: '',
    imageUrl: '',
    siteName: '',
    category: defaultCategory ? { id: defaultCategory.key, name: defaultCategory.value } : null,
  })

  const busy = isFetchingMeta || isSubmitting

  const handleChange = ({ target: { value } }) => {
    setLinkUrl(value)
  }

  const getMetaData = async () => {
    setIsFetchingMeta(true)
    const res = await getLinkMeta(linkUrl)
    setIsFetchingMeta(false)
    if (res?.success) {
      setIsFetchedMeta(true)
      setLinkMeta((prev) => ({
        ...prev,
        ...(res.data?.meta || {}),
        linkUrl: res.data?.meta?.linkUrl || linkUrl,
        category: prev.category,
      }))
    }
  }

  const submit = async (meta) => {
    setIsSubmitting(true)
    try {
      const res = await onSubmit(meta)
      if (res?.success || res?.type?.endsWith?.('_SUCCESS') || res === true) {
        onClose()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFetchedMeta) {
      await getMetaData()
      return
    }
    await submit(linkMeta)
  }

  const handleCategoryChange = ({ key, value }) => {
    setLinkMeta((prev) => ({ ...prev, category: { id: key, name: value } }))
  }

  const handleMetaChange = ({ target: { name, value } }) => {
    setLinkMeta((prev) => ({ ...prev, [name]: value }))
  }

  const handleEnterClick = (event) => {
    if (event.which === 13) {
      if (!event.repeat) {
        const newEvent = new Event('submit', { cancelable: true })
        event.target.form.dispatchEvent(newEvent)
      }
      handleSubmit(event)
    }
  }

  return (
    <Modal.Wrapper className={classNames({ blk })} onEscKeydown={() => !busy && onClose()}>
      <Modal.Header closeAble={!busy} onClose={onClose}>
        {title}
      </Modal.Header>
      <Modal.Content>
        <form onSubmit={handleSubmit}>
          {isFetchedMeta ? (
            <LinkMeta
              meta={linkMeta}
              handleCategoryChange={handleCategoryChange}
              handleMetaChange={handleMetaChange}
              categories={categories}
            />
          ) : (
            <Input
              autoFocus
              placeholder="https://www.example.com/article"
              category="light"
              label="Url to save"
              as="textarea"
              rows="4"
              onChange={handleChange}
              name="url"
              value={linkUrl}
              className={classNames({ blk, elt: 'link-url' })}
              onKeyPress={handleEnterClick}
            />
          )}
          <ConfirmationButtons
            handleCancel={onClose}
            isSubmitting={busy}
            confirmText={isFetchedMeta ? confirmText : 'Get Link Meta'}
            submitButtonType="submit"
          />
        </form>
      </Modal.Content>
    </Modal.Wrapper>
  )
}

AddLinkModal.propTypes = {
  onClose: func.isRequired,
  onSubmit: func.isRequired,
  getLinkMeta: func.isRequired,
  categories: arrayOf(shape({ key: string, value: string })),
  defaultCategoryId: string,
  confirmText: string,
  title: string,
}

AddLinkModal.defaultProps = {
  categories: [],
  defaultCategoryId: null,
  confirmText: 'Add this Link',
  title: 'Link Details',
}

export default connect(null, { getLinkMeta: getLinkMetaAction })(AddLinkModal)
