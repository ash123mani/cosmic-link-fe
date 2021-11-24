import React, { useState } from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'

import { Input, Button } from '@common'
import { classNames } from '@common/helpers'
import InlineSpinner from '@local/inline-spinner'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'reset-password-form'

const ResetPasswordForm = ({ resetPassword }) => {
  const history = useHistory()
  const { resetToken } = useParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({})

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    resetPassword({
      password: formData.password,
      resetToken,
    }).then(({ data }) => {
      if (!data.error) {
        history.push('/login')
      }
    })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <form className={classNames({ blk })}>
      <Input
        className={classNames({ blk, elt: 'password' })}
        type="password"
        placeholder="Password for your cosmos"
        label="Password"
        name="password"
        onChange={handleChange}
      />
      <Input
        className={classNames({ blk, elt: 'password' })}
        type="password"
        placeholder="Password recheck"
        label="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
      />
      <Button
        fluid
        onClick={handleSubmit}
        loading={isSubmitting}
        loader={<InlineSpinner />}
      >
        Submit
      </Button>
    </form>
  )
}

ResetPasswordForm.propTypes = {
  resetPassword: func.isRequired,
}

const ResetPasswordFormWithConnect = connect(
  null, actions,
)(ResetPasswordForm)

export default ResetPasswordFormWithConnect
