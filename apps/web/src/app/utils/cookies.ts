// Cookie settings
const COOKIE_SETTINGS = process.env.NODE_ENV === 'development' ? 'path=/;' : 'path=/; HttpOnly; Secure'

// Set a cookie
export const setCookie = (name: string, value: string, days = 7) => {
  console.log('setting cookie', name, value)
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // Expiration time in days
  const expires = `expires=${date.toUTCString()}`
  // Save the token in cookies
  document.cookie = `${name}=${value}; ${expires}; ${COOKIE_SETTINGS}`
}

// Get a cookie by name
export const getCookie = (name: string) => {
  const value = `; ${document.cookie}` // Get all cookies
  const parts = value.split(`; ${name}=`) // Split by the cookie name
  if (parts.length === 2) {
    const part = parts.pop()
    if (part) return part.split(';').shift() // Return the cookie value
  }
  return null // Return null if not found
}

// Delete a cookie
export const deleteCookie = (name: any) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure`
}
