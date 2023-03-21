import React, { useState } from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import { useHistory } from 'react-router-dom'

import { Input, Button } from '@common'
import { classNames } from '@common/helpers'
import InlineSpinner from '@local/inline-spinner'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'register-form'

const RegisterForm = ({ registerUser }) => {
  const history = useHistory()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({})

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSubmitting(true)
    registerUser(formData).then(({ success }) => {
      if (success) {
        history.push('/links')
      }
    })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <form className={classNames({ blk })} onSubmit={handleSubmit}>
      <Input
        className={classNames({ blk, elt: 'name' })}
        placeholder="Name of owner of cosmos"
        label="Name"
        name="name"
        onChange={handleChange}
      />
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
      <Button
        fluid
        type="sublit"
        loading={isSubmitting}
        loader={<InlineSpinner />}
        className={classNames({ blk, elt: 'submit-btn' })}
      >
        Submit
      </Button>
    </form>
  )
}

RegisterForm.propTypes = {
  registerUser: func.isRequired,
}

const RegisterFormWithConnect = connect(
  null, actions,
)(RegisterForm)

export default RegisterFormWithConnect
