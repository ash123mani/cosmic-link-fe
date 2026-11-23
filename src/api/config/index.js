import auth from './auth'
import links from './links'
import user from './user'
import users from './users'
import shares from './shares'
import managedFolders from './managedFolders'

export default {
  ...auth,
  ...links,
  ...user,
  ...users,
  ...shares,
  ...managedFolders,
}
