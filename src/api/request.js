import { getStorageItem } from '@util/storage'
import config from './config'

const isDevelopment = process.env.NODE_ENV !== 'production'
const baseUrl = isDevelopment ? 'http://localhost:5000' : 'https://cosmic-link-be.onrender.com'

const buildRequest = (name, options = {}) => {
  const requestConfig = config[name]
  if (!requestConfig) {
    throw new Error(`No API config found for "${name}"`)
  }

  const {
    appendPath = '', body, headers, params,
  } = options
  const { endPoint, auth = false, ...rest } = requestConfig
  const url = new URL(baseUrl + endPoint + appendPath)

  if (params) {
    Object.keys(params).forEach((key) => {
      const value = params[key]
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value)
      }
    })
  }

  let requestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(requestConfig.headers || {}),
    ...(headers || {}),
  }

  if (auth) {
    const token = getStorageItem('local', 'token')
    requestHeaders = {
      ...requestHeaders,
      Authorization: `Bearer ${token}`,
    }
  }

  const requestOptions = {
    ...rest,
    headers: requestHeaders,
  }

  if (requestConfig.method !== 'GET' && body !== undefined) {
    requestOptions.body = JSON.stringify(body)
  }

  return { url, requestOptions }
}

export default buildRequest
