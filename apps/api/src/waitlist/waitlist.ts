export interface Waitlist {
  id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  allowed: boolean
  allowedOn?: string
  createdAt: string
  updatedAt: string
}
