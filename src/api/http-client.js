const parseJson = async (response) => {
  try {
    return await response.json()
  } catch (error) {
    return {
      success: false,
      error: 'Invalid server response',
      statusCode: response.status,
    }
  }
}

const httpClient = async (url, options = {}) => {
  try {
    const response = await fetch(url, options)
    const json = await parseJson(response)
    return {
      ok: response.ok,
      status: response.status,
      json,
    }
  } catch (error) {
    return {
      ok: false,
      status: 0,
      json: {
        success: false,
        error: error.message || 'Network request failed',
        statusCode: 0,
      },
      networkError: error,
    }
  }
}

export default httpClient
