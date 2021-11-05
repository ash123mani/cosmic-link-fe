import React, { useState } from 'react'
import { connect } from 'react-redux'
import { func } from 'prop-types'

import { Input, Button } from '@common'
import { classNames } from '@common/helpers'

import { actions } from './index.connect'
import './_style.scss'

const blk = 'register-form'

const RegisterForm = ({ registerUser }) => {
  const [formData, setFormData] = useState({})

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    registerUser(formData)
  }

  return (
    <form className={classNames({ blk })}>
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
      <Button fluid onClick={handleSubmit}>Submit</Button>
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
