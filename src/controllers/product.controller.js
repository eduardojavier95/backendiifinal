import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

// Implementa los demás controladores de manera similar

export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export const createProductController = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).send({ status: "success", payload: product });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.status(200).send({ status: "success", payload: product });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
