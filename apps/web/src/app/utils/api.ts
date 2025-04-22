import { deleteCookie, getCookie, setCookie, AUTH_COOKIE_NAME } from './cookies'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Get token from cookies
const getAuthToken = () => {
  const user = getUser()
  if (user) {
    return JSON.parse(user).accessToken
  }

  const cookie = getCookie(AUTH_COOKIE_NAME)
  return cookie
}

// Set token in cookies
const setAuthToken = (token: string) => {
  setCookie(AUTH_COOKIE_NAME, token)
}

// Remove token from cookies
const removeAuthToken = () => {
  deleteCookie(AUTH_COOKIE_NAME)
}

const setUser = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

const getUser = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user')
  }
  return null
}

const removeUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}

// Logout function
const logout = async () => {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    removeAuthToken()
    removeUser()
  } catch (error) {
    console.error('Logout failed:', error)
    removeAuthToken()
  }
}

async function request(endpoint: string, method = 'GET', body = null, headers = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  // Add auth token to headers if it exists
  const authToken = getAuthToken()
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include' as RequestCredentials,
    body: body ? JSON.stringify(body) : null,
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      if (response.status == 401) {
        removeUser()
        removeAuthToken()
      }
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

// File upload function
async function uploadFile(endpoint: string, file: File) {
  const url = `${API_BASE_URL}${endpoint}`
  const formData = new FormData()
  formData.append('file', file)

  const options = {
    method: 'POST',
    credentials: 'include' as RequestCredentials,
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: formData,
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      if (response.status === 401) {
        removeAuthToken()
      }
      const error = await response.json()
      throw new Error(error.message || 'Failed to upload file')
    }

    return await response.json()
  } catch (error) {
    console.error('File Upload Failed:', error)
    throw error
  }
}

// Client-side API functions
export const get = async <T>(endpoint: string, headers = {}): Promise<T> => {
  return request(endpoint, 'GET', null, headers)
}

export const post = (endpoint: string, body: any, headers = {}) => request(endpoint, 'POST', body, headers)
export const put = (endpoint: string, body: any, headers = {}) => request(endpoint, 'PUT', body, headers)
export const patch = (endpoint: string, body: any, headers = {}) => request(endpoint, 'PATCH', body, headers)
export const del = (endpoint: string, headers = {}) => request(endpoint, 'DELETE', null, headers)
export const upload = (endpoint: string, file: File) => uploadFile(endpoint, file)

// Export auth token functions
export { getAuthToken, setAuthToken, removeAuthToken, logout, setUser, getUser }
