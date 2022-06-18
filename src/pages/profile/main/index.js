import React from 'react'
import { connect } from 'react-redux'
import { shape, arrayOf, string } from 'prop-types'

import { classNames } from '@common/helpers'

import UserInfo from '../components/user-info'
import CategoryInfo from '../components/category-info'

import { mapStateToProps } from './index.connect'
import './_style.scss'

const blk = 'profile-page'

const Main = ({ user, categories }) => (
  <main className={classNames({ blk })}>
    <UserInfo user={user} />
    <CategoryInfo categories={categories} />
  </main>
)

Main.propTypes = {
  user: shape({
    name: string,
    email: string,
    categories: arrayOf(shape({
      name: string,
      id: string,
    })),
  }),
  categories: arrayOf(shape({
    name: string,
    id: string,
  })),
}

Main.defaultProps = {
  user: {},
  categories: [],
}

const MainWithConnect = connect(mapStateToProps)(Main)

export default MainWithConnect
