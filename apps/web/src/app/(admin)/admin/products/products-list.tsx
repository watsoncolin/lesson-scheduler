'use client'

import { useState } from 'react'
import { Divider } from '@components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@components/dropdown'
import { Link } from '@components/link'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { IProduct } from '@lesson-scheduler/shared'
import ProductModal from './product-modal'
import DeleteProductModal from './delete-product-modal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/table'
import { Button } from '@components/button'
import ProductEditModal from './product-edit-modal'
interface ProductsListProps {
  products: IProduct[]
}

export default function ProductsList({ products }: ProductsListProps) {
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<IProduct | null>(null)

  const handleEditClick = (product: IProduct, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditingProduct(product)
  }

  const handleDeleteClick = (product: IProduct, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDeletingProduct(product)
  }

  const handleCloseEditModal = () => {
    setEditingProduct(null)
  }

  const handleCloseDeleteModal = () => {
    setDeletingProduct(null)
  }

  const handleSuccess = () => {
    window.location.reload()
  }

  return (
    <>
      <ul className="mt-10">
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Credits</TableHeader>
              <TableHeader>Lesson type</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .sort((a, b) => a.order - b.order)
              .map(product => (
                <TableRow key={product.id} title={`Product #${product.id}`}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{product.amount}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.credits}</TableCell>
                  <TableCell>{product.lessonType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button onClick={e => handleEditClick(product, e)}>Edit</Button>
                      <Button onClick={e => handleDeleteClick(product, e)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ul>

      {editingProduct && (
        <ProductEditModal
          isOpen={!!editingProduct}
          onClose={handleCloseEditModal}
          onSuccess={handleSuccess}
          product={editingProduct}
        />
      )}

      {deletingProduct && (
        <DeleteProductModal
          isOpen={!!deletingProduct}
          onClose={handleCloseDeleteModal}
          onSuccess={handleSuccess}
          product={deletingProduct}
        />
      )}
    </>
  )
}
