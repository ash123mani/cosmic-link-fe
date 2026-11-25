const normalizeResponse = (response = {}) => {
  const { json = {}, status = 0, networkError } = response
  const {
    success = false, error, statusCode = status, ...rest
  } = json || {}

  if (success) {
    return {
      success: true,
      data: rest,
      statusCode,
    }
  }

  return {
    success: false,
    data: { error, statusCode, ...(rest || {}) },
    error: {
      message: error || (networkError ? networkError.message : 'Request failed'),
      statusCode,
    },
  }
}

export default normalizeResponse
