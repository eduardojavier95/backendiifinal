import { getProductRepository } from "../dao/factory.js";

const ProductsRepository = getProductRepository();

export const getProducts = async () => {
  return await ProductsRepository.getProducts();
};

export const getProductById = async (id) => {
  return await ProductsRepository.getProductById(id);
};

export const createProduct = async (productData) => {
  return await ProductsRepository.createProduct(productData);
};

export const updateProduct = async (id, productData) => {
  return await ProductsRepository.updateProduct(id, productData);
};

export const deleteProduct = async (id) => {
  return await ProductsRepository.deleteProduct(id);
};
