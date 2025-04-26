import { Heading } from '@components/heading'
import { Input, InputGroup } from '@components/input'
import { Select } from '@components/select'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { get } from '@utils/api'
import { IProduct } from '@lesson-scheduler/shared'
import ProductsList from './products-list'
import ProductModalWrapper from './product-modal-wrapper'

export const metadata: Metadata = {
  title: 'Products',
}

// Server-side data fetching
async function getProducts() {
  try {
    const products = await get<IProduct[]>('/products')
    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export default async function ProductsPage() {
  // Fetch products on the server
  const products = await getProducts()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Products</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search products&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="amount">Sort by amount</option>
                <option value="credits">Sort by credits</option>
              </Select>
            </div>
          </div>
        </div>
        <ProductModalWrapper />
      </div>

      {/* Pass the server-fetched data to the client component */}
      <ProductsList products={products} />
    </>
  )
}
