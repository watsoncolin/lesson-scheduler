import { deleteCookie, getCookie } from './cookies'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

// Set token in localStorage
const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token)
}

// Remove token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('authToken')
}

async function request(endpoint: string, method = 'GET', body = null, headers = {}) {
  const authToken = getAuthToken()
  const url = `${API_BASE_URL}${endpoint}`
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : '', // Include the auth token if available
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  }

  try {
    console.log('options', options)
    console.log('url', url)
    const response = await fetch(url, options)

    if (!response.ok) {
      if (response.status == 401) {
        removeAuthToken()
      }
      const error = await response.json()
      throw new Error(error.message || 'Something went wrong')
    }

    if (response.status === 204) {
      return null // For no content responses (e.g., DELETE)
    }

    return await response.json()
  } catch (error) {
    console.error('API Request Failed:', error)
    throw error // Re-throw error to handle it where the API call is made
  }
}

export const get = async <T>(endpoint: string, headers = {}): Promise<T> => {
  return request(endpoint, 'GET', null, headers)
}
export const post = (endpoint: string, body: any, headers = {}) => request(endpoint, 'POST', body, headers)
export const put = (endpoint: string, body: any, headers = {}) => request(endpoint, 'PUT', body, headers)
export const patch = (endpoint: string, body: any, headers = {}) => request(endpoint, 'PATCH', body, headers)
export const del = (endpoint: string, headers = {}) => request(endpoint, 'DELETE', null, headers)

// Export auth token functions
export { getAuthToken, setAuthToken, removeAuthToken }
