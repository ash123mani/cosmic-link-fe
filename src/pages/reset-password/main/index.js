import React from 'react'
import { useParams } from 'react-router-dom'

import { classNames } from '@common/helpers'

import Title from '../components/title'
import ResetPasswordForm from '../components/reset-password-form'

import './_style.scss'

const blk = 'reset-password-page'

const Main = () => {
  const { token } = useParams()
  console.log('token', token)

  return (
    <main className={classNames({ blk })}>
      <section className={classNames({ blk, elt: 'content' })}>
        <Title />
        <ResetPasswordForm />
      </section>
    </main>
  )
}

export default Main
