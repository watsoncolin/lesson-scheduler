import { OpenAPI } from '@/api/core/OpenAPI'

export type ApiConfig = {
  headers?: Record<string, string>
  credentials?: 'include' | 'omit' | 'same-origin'
}

// Decorator to automatically configure the service before method execution
export function WithConfig() {
  return function (target: any) {
    // Get all static methods of the class
    const staticMethods = Object.getOwnPropertyNames(target).filter(
      prop => typeof target[prop] === 'function' && prop !== 'constructor',
    )

    // Wrap each static method
    staticMethods.forEach(methodName => {
      const originalMethod = target[methodName]
      target[methodName] = async function (...args: any[]) {
        await BaseService.configure()
        return originalMethod.apply(this, args)
      }
    })

    return target
  }
}

export class BaseService {
  public static async configure(config: ApiConfig = {}) {
    // Set base URL for all environments
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || ''

    if (typeof window === 'undefined') {
      // Server-side configuration
      try {
        const { cookies } = await import('next/headers')
        const cookieStore = await cookies()
        const cookieString = cookieStore.toString()

        OpenAPI.HEADERS = {
          ...OpenAPI.HEADERS,
          Cookie: cookieString,
        }
      } catch (error) {
        // If we can't get cookies (e.g., in a client component), just continue without them
        console.warn('Could not get cookies for server-side request')
      }
    } else {
      // Client-side configuration
      OpenAPI.HEADERS = config.headers
      OpenAPI.CREDENTIALS = config.credentials || 'include'
      OpenAPI.WITH_CREDENTIALS = true
    }
  }
}

// Export the proxied OpenAPI instance
export { OpenAPI }
