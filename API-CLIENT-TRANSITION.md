# API Client Transition Plan

## Overview

This document outlines the plan for transitioning to the newly generated API client while maintaining existing functionality. The API client is generated using `openapi-typescript-codegen` from the OpenAPI specification.

## Current Setup

- API client is generated in `./apps/web/src/api`
- Generated using the `generate-api-client` script in package.json
- Uses OpenAPI specification from `openapi.json`

## Transition Phases

### Phase 1: Setup and Testing (Current)

- [x] Generate API client
- [x] Create a new directory structure for API-related code
- [ ] Set up test environment for new API client
- [ ] Document the generated API client structure

### Phase 2: Parallel Implementation

- [ ] Create a new API service layer using the generated client
- [ ] Implement new API calls alongside existing ones
- [ ] Add error handling and type safety

### Phase 3: Gradual Migration

- [ ] Identify low-risk endpoints to migrate first
- [ ] Create feature flags for new API implementations
- [ ] Migrate one endpoint at a time
- [ ] Monitor performance and error rates
- [ ] Gather feedback from testing

### Phase 4: Full Migration

- [ ] Complete migration of all endpoints
- [ ] Remove old API implementations
- [ ] Clean up unused code
- [ ] Update documentation

## Implementation Guidelines

### Directory Structure

```
apps/web/src/
├── api/                    # Generated API client
├── services/
│   ├── api/               # New API service layer
│   │   ├── types/        # Type definitions
│   │   ├── server/       # Server-side API implementations
│   │   ├── client/       # Client-side API implementations
│   │   │   ├── hooks/    # React Query hooks
│   │   │   └── utils/    # Client-side utilities
│   │   └── shared/       # Shared utilities and types
│   └── legacy/           # Existing API implementations
```

### Next.js Server Components Integration

1. **API Client Structure**

   - Keep the generated API client in a shared location
   - Create separate server and client wrappers for the API client
   - Use the 'use client' directive only in client-side components

2. **Server Components Implementation**

   ```typescript
   // services/api/server/api.ts
   import { Api } from '@/api/generated'

   export const serverApi = new Api({
     baseUrl: process.env.NEXT_PUBLIC_API_URL,
     // Server-specific configuration
   })
   ```

3. **Client Components Implementation**

   ```typescript
   // services/api/client/api.ts
   'use client'

   import { Api } from '@/api/generated'

   export const clientApi = new Api({
     baseUrl: process.env.NEXT_PUBLIC_API_URL,
     // Client-specific configuration (e.g., credentials)
   })
   ```

4. **React Query Integration**

   ```typescript
   // services/api/client/hooks/useQuery.ts
   'use client'

   import { useQuery } from '@tanstack/react-query'
   import { clientApi } from '../api'

   export function useApiQuery<T>(key: string, fetcher: () => Promise<T>) {
     return useQuery({
       queryKey: [key],
       queryFn: fetcher,
     })
   }
   ```

5. **Server Actions (if needed)**

   ```typescript
   // services/api/server/actions.ts
   'use server'

   import { serverApi } from './api'

   export async function serverAction() {
     return serverApi.someEndpoint()
   }
   ```

### Best Practices

1. Use React Query for data fetching and caching
2. Implement proper error handling
3. Add TypeScript types for all API responses
4. Write unit tests for new implementations
5. Document API usage with examples

### Migration Strategy

1. Start with read-only endpoints
2. Move to write operations
3. Handle authentication last
4. Keep both implementations running in parallel
5. Use feature flags to control rollout
6. Implement server/client separation from the start
7. Use React Query only in client components
8. Leverage server components for initial data fetching

## Testing Strategy

1. Unit tests for new API service layer
2. Integration tests for API endpoints
3. End-to-end tests for critical flows
4. Performance testing
5. Error handling validation

## Rollback Plan

1. Maintain feature flags for easy rollback
2. Keep old implementations until full migration
3. Monitor error rates and performance
4. Have rollback scripts ready

## Timeline

- Phase 1: 1-2 weeks
- Phase 2: 2-3 weeks
- Phase 3: 3-4 weeks
- Phase 4: 1-2 weeks

Total estimated time: 7-11 weeks

## Success Metrics

1. Zero increase in error rates
2. Improved type safety
3. Better developer experience
4. Maintained or improved performance
5. Successful migration of all endpoints

## Next Steps

1. Review and approve this transition plan
2. Set up the new directory structure
3. Begin with Phase 1 implementation
4. Schedule regular progress reviews
