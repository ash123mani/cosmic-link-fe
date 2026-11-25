import log from '@util/log'

import httpClient from './http-client'
import normalizeResponse from './normalize-response'
import buildRequest from './request'
import handleAuthError from './handle-auth-error'

const api = async (name, options = {}) => {
  try {
    const { url, requestOptions } = buildRequest(name, options)
    const response = await httpClient(url, requestOptions)
    const normalized = normalizeResponse(response)
    return handleAuthError(normalized)
  } catch (error) {
    log(error.message || 'API request failed', 'error')
    return handleAuthError({
      success: false,
      data: { error: error.message || 'Request failed', statusCode: 0 },
      error: { message: error.message || 'Request failed', statusCode: 0 },
    })
  }
}

export default api
