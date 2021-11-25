import { removeStorageItem } from '@util/storage'
import { history } from '@util/location'

const logOutUser = () => async (dispatch) => {
  dispatch({
    type: 'LOG_OUT_USER',
  })

  removeStorageItem('local', 'token')
  history.push('/')
}

export default logOutUser
