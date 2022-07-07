import React from 'react'
import Link from 'next/link'

const ProductCard = ({product}) => {
    return (
        <Link href={`/products/${product.id}`}>
            <div className='border border-gray-200 shadow-md p-6'>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard