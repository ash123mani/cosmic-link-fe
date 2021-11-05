import log from '@util/log'
import config from './config'

const baseUrl = 'http://localhost:5001'

const api = (name, options) => {
  const {
    appendPath = '', body, headers, params,
  } = options
  const requestConfig = config[name]

  if (!requestConfig) {
    log('No config is found inside \'@api/config\'', 'error')
  }

  const { endPoint, ...rest } = requestConfig
  const url = new URL(baseUrl + endPoint + appendPath)

  if (params) {
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))
  }

  const requestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
    ...requestConfig.headers || {},
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
}

export default api
