export interface IWaitlist {
  id: string
  userId: string
  allowed: boolean
  allowedOn?: Date
  createdAt: Date
  updatedAt: Date
}
