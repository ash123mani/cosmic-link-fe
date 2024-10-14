import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { func, bool } from 'prop-types'

import { Input, Button } from '@common'
import log from '@util/log'
import { classNames } from '@common/helpers'
import InlineSpinner from '@local/inline-spinner'
import { useAutoFocus } from '@hooks'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'login-form'

const LoginForm = ({
  loginUser, forgotPassword, onForgotPasswordClick, showForgotPassword,
}) => {
  const history = useHistory()

  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    log('Logging In', 'log')
    e.preventDefault()
    setIsSubmitting(true)
    loginUser(formData).then(({ data }) => {
      if (data.token) {
        history.replace('/links')
      }
    })
      .finally(() => setIsSubmitting(false))
  }

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault()
    forgotPassword(formData.email || '')
  }
  const inputRef = useAutoFocus([showForgotPassword])

  return (
    <form className={classNames({ blk })} onSubmit={showForgotPassword ? handleForgotPasswordSubmit : handleSubmit}>
      <Input
        ref={inputRef}
        className={classNames({ blk, elt: 'email' })}
        placeholder="Email for your cosmos"
        label="Email"
        name="email"
        onChange={handleChange}
      />
      {!showForgotPassword && (
        <Input
          className={classNames({ blk, elt: 'password' })}
          type="password"
          placeholder="Password for your cosmos"
          label="Password"
          name="password"
          onChange={handleChange}
        />
      )}
      <div
        role="button"
        className={classNames({ blk, elt: 'forgot' })}
        onClick={onForgotPasswordClick}
        onKeyDown={onForgotPasswordClick}
        tabIndex={0}
      >
        {showForgotPassword ? '< Go Back to login' : 'Forgot Password >'}
      </div>
      <Button
        loader={<InlineSpinner />}
        fluid
        loading={isSubmitting}
        type="submit"
      >
        Submit

      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: func.isRequired,
  onForgotPasswordClick: func.isRequired,
  showForgotPassword: bool,
  forgotPassword: func.isRequired,
}

LoginForm.defaultProps = {
  showForgotPassword: false,
}

const LoginFormWithConnect = connect(
  null, actions,
)(LoginForm)

export default LoginFormWithConnect
