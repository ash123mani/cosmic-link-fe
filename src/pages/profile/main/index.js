import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  shape, arrayOf, string, func,
} from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import { classNames } from '@common/helpers'
import { Button } from '@common'
import mediaQueries from '@common/media-queries'

import UserInfo from '../components/user-info'
import CategoryInfo from '../components/category-info'

import { mapStateToProps, actions } from './index.connect'
import './_style.scss'

const blk = 'profile-page'

const Main = ({ user, categories, logOutUser }) => {
  const history = useHistory()
  const isMediumDown = useMediaQuery(mediaQueries.mediumDown)

  const handleLogOut = () => {
    logOutUser()
    history.push('/')
  }

  return (
    <main className={classNames({ blk })}>
      <div className={classNames({ blk, elt: 'head' })}>
        <h1 className={classNames({ blk, elt: 'title' })}>Profile</h1>
        <p className={classNames({ blk, elt: 'subtitle' })}>Manage your account and categories.</p>
      </div>
      <UserInfo user={user} />
      <CategoryInfo categories={categories} />
      {isMediumDown && (
        <div className={classNames({ blk, elt: 'actions' })}>
          <Button category="plain" onClick={handleLogOut} className={classNames({ blk, elt: 'logout' })}>Logout</Button>
        </div>
      )}
    </main>
  )
}

Main.propTypes = {
  user: shape({
    name: string,
    email: string,
    categories: arrayOf(shape({ name: string, id: string })),
  }),
  categories: arrayOf(shape({ name: string, id: string })),
  logOutUser: func.isRequired,
}

Main.defaultProps = {
  user: {},
  categories: [],
}

export default connect(mapStateToProps, actions)(Main)
