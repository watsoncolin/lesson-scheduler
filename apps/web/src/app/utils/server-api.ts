import { getServerCookie } from './server-cookies'
import { AUTH_COOKIE_NAME } from './cookies'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function request(endpoint: string, method = 'GET', body = null, headers = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  // Get auth token from server-side cookies
  const authToken = await getServerCookie(AUTH_COOKIE_NAME)
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Something went wrong')
    }

    if (response.status === 204) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('API Request Failed:', error)
    throw error
  }
}

// Server-side API functions
export const get = async <T>(endpoint: string, headers = {}): Promise<T> => {
  return request(endpoint, 'GET', null, headers)
}

export const post = (endpoint: string, body: any, headers = {}) => request(endpoint, 'POST', body, headers)
export const put = (endpoint: string, body: any, headers = {}) => request(endpoint, 'PUT', body, headers)
export const patch = (endpoint: string, body: any, headers = {}) => request(endpoint, 'PATCH', body, headers)
export const del = (endpoint: string, headers = {}) => request(endpoint, 'DELETE', null, headers)
