import React from 'react'
import Layout from '../components/layout';
import ProductForm from '../components/ProductForm';

const New = () => {
  return (
    <Layout>
        <div className='grid place-items-center h-5/6'>
            <ProductForm />
        </div>
    </Layout>
  )
}

export default New