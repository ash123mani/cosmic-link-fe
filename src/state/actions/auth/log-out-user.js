import { removeStorageItem } from '@util/storage'
import { LOG_OUT_USER } from '@state/constants/auth'

const logOutUser = () => async (dispatch) => {
  dispatch({
    type: LOG_OUT_USER,
  })

  await removeStorageItem('local', 'token')
}

export default logOutUser
