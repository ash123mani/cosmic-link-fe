import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { func } from 'prop-types'

import { Input, Button, Spinner } from '@common'
import { classNames } from '@common/helpers'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'login-form'

const LoginForm = ({ loginUser }) => {
  const history = useHistory()

  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    loginUser(formData).then(({ data }) => {
      if (data.token) {
        history.push('/links')
      }
    })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <form className={classNames({ blk })}>
      <Input
        className={classNames({ blk, elt: 'email' })}
        placeholder="Email for your cosmos"
        label="Email"
        name="email"
        onChange={handleChange}

      />
      <Input
        className={classNames({ blk, elt: 'password' })}
        type="password"
        placeholder="Password for your cosmos"
        label="Password"
        name="password"
        onChange={handleChange}

      />
      <div className={classNames({ blk, elt: 'forgot' })}>
        Forgot Password
      </div>
      <Button
        loader={<Spinner size="small" text="Submiting..." inline />}
        fluid
        onClick={handleSubmit}
        loading={isSubmitting}
      >
        Submit

      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: func.isRequired,
}

const LoginFormWithConnect = connect(
  null, actions,
)(LoginForm)

export default LoginFormWithConnect
