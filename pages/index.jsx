import axios from 'axios';
import Link from 'next/link';
import Layout from '../components/layout';
import ProductCard from '../components/ProductCard';

export default function Home({products}) {
  
  const renderProducts = () => {
    if (products.length === 0) {
      return <h1 className='text-center text-2xl font-bold'>No products found</h1>  
    }

    return products.map(product => (
      <ProductCard key={product.id} product={product}/>
    ));
  }

  return (
    <Layout>
     <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {renderProducts()}
     </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const {data:products} = await axios.get('http://localhost:3000/api/products')
  return {
    props: {
      products
    }
  }
}