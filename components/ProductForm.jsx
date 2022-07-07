import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ProductForm = () => {

  const router = useRouter();
  const [product, setProduct] = useState({ name: "", description: "", price: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (router.query.id) {
      await axios.put(`/api/products/${router.query.id}`, product).then(res => {
        console.log(res);
        toast.success("Product updated");
        router.push("/");
      }).catch(err => {
        toast.error(err.response.data.error.message);
      });
    } else {
      await axios.post("/api/products", product).then(res => {
        console.log(res);
        toast.success("Product created");
        router.push("/");
      }
      ).catch(err => {
        toast.error(err.response.data.error.message);
      });
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    setProduct({
      ...product,
      [name]: value
    });
  }

  useEffect(() => {
    if (router.query.id) {
      (async () => {
        await axios.get("/api/products/" + router.query.id).then(res => {
          setProduct(res.data);
        }
        ).catch(err => {
          console.log(err);
        });
      })();
    }
  }, [router.query.id]);

  return (
    <div className="bg-gray-100 w-full max-w-xs">
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" name='name' onChange={handleChange} value={product.name} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />    
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input type="text" name='price' onChange={handleChange} value={product.price} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea name="description" id="" rows="2" onChange={handleChange} value={product.description} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></textarea>
        </div>
        
        <button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 focus:outline-none focus:shadow-outline font-bold">{router.query.id ? 'Update Product' : 'Save Product'}</button>
      </form>
    </div>
  )
}

export default ProductForm  