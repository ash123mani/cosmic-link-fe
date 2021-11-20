import React from 'react'

import { classNames } from '@common/helpers'

import Title from '../components/title'
import ResetPasswordForm from '../components/reset-password-form'

import './_style.scss'

const blk = 'reset-password-page'

const Main = () => (
  <main className={classNames({ blk })}>
    <section className={classNames({ blk, elt: 'content' })}>
      <Title />
      <ResetPasswordForm />
    </section>
  </main>
)

export default Main
