import log from '@util/log'
import store from '@store'
import { setAppBanner } from '@state/actions/app'
import { getStorageItem } from '@util/storage'

import handleAuthError from './handle-auth-error'
import config from './config'

const isDevelopment = process.env.NODE_ENV !== 'production'

const baseUrl = isDevelopment ? process.env.API_BASE_URL_LOCAL : process.env.API_BASE_URL_PROD

const api = (name, options = {}) => {
  const {
    appendPath = '', body, headers, params,
  } = options
  const requestConfig = config[name]

  if (!requestConfig) {
    log('No config is found inside \'@api/config\'', 'error')
  }

  const { endPoint, auth = false, ...rest } = requestConfig
  const url = new URL(baseUrl + endPoint + appendPath)

  if (params) {
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))
  }

  let requestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
    ...requestConfig.headers || {},
  }

  if (auth) {
    const token = getStorageItem('local', 'token')
    requestHeaders = {
      ...requestHeaders,
      Authorization: `Bearer ${token}`,
    }
  }

  let requestOptions = {
    ...rest,
    body: JSON.stringify(body),
    headers: requestHeaders,
  }

  if (requestConfig.method !== 'GET') {
    requestOptions = {
      ...requestOptions,
      body: JSON.stringify(body),
    }
  }

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      const {
        success, error, statusCode = 200, ...rest
      } = response
      if (success) {
        return {
          success,
          data: rest,
        }
      }
      return {
        success,
        data: { error, statusCode },
      }
    })
    .then(handleAuthError)
    .catch((error) => {
      const message = error.message || 'It \'s fine, some network problem!'

      store.dispatch(setAppBanner({
        type: 'error',
        message,
      }))

      throw new Error(message)
    })
}

export default api
