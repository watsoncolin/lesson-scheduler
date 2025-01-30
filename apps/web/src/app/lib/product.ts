export interface Product {
  id: string
  name: string
  lessonType: 'private' | 'group'
  credits: number
  amount: number
  description: string
  features: string[]
}
