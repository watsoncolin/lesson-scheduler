export interface User {
  id: string
  accessToken: string
  firstName: string
  lastName: string
  email: string
  zip: string
  state: string
  city: string
  address1: string
  address2: string
  phone: string
  role: string
  signedWaiver: boolean
  waiverSignature: string | null
  waiverSignatureDate: Date | null
}
