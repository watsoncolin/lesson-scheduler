import { ProductsList } from './products-list'
import { ProductModalWrapper } from './product-modal-wrapper'

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductModalWrapper />
      </div>
      <ProductsList />
    </div>
  )
}
