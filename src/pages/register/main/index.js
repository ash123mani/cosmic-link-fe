import React from 'react'

import { classNames } from '@common/helpers'

import Title from '../components/title'
import RegisterForm from '../components/register-form'

import './_style.scss'

const blk = 'register-page'

const Main = () => (
  <main className={classNames({ blk })}>
    <section className={classNames({ blk, elt: 'content' })}>
      <Title />
      <RegisterForm />
    </section>
  </main>
)

export default Main
