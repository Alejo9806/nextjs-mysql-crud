import { pool } from "../../../config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return await getProduct(req, res);
        case 'DELETE':
            return await deleteProduct(req, res);
        case 'PUT':
            return await updateProduct(req, res);
        default:
            break;
    }
}

const getProduct = async (req, res) => {
    const { id } = req.query;
    try {
        const [result] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.query;
    try {
        const [result] = await pool.query('DELETE FROM product WHERE id = ?', [id]);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.query;
    try {
        const { name, description, price } = req.body;
        await pool.query('UPDATE product SET ? WHERE id = ?', [{ name, description, price }, id]);
        res.status(204).json();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error });
    }
}