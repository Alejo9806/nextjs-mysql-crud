import Layout from "../../components/layout"
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const ProductView = ({product}) => {

    const router = useRouter();
    const handleDelete = async (id) => {
        await axios.delete(`/api/products/${id}`).then(res => {
            console.log(res);
            router.push("/");
        }).catch(err => {
            toast.error(err.response.data.error.message);
            console.log(err);
        });
    }
  return (
    <Layout>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>

        <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-2" onClick={()=> handleDelete(product.id)}>Delete</button>
        <button className="bg-gray-500 hover:bg-graty-800 ml-2 text-white px-5 py-2 rounded" onClick={()=> router.push(`edit/${product.id}`)}>Edit</button>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
    const { data: product } = await axios.get("http://localhost:3000/api/products/"+ctx.query.id)
    return {
        props: {
            product
        }
    }
}


export default ProductView