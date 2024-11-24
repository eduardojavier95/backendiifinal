import ProductRepository from "./product.repository.js";
import { getProductsDao } from "../../dao/factory.js";

export default class ProductRepositoryMongo extends ProductRepository {
  constructor() {
    super();
    this.productDao = getProductsDao();
  }

  async getProducts() {
    return await this.productDao.getProducts();
  }

  async getProductById(id) {
    return await this.productDao.getProductById(id);
  }

  async createProduct(productData) {
    return await this.productDao.createProduct(productData);
  }

  async updateProduct(id, productData) {
    return await this.productDao.updateProduct(id, productData);
  }

  async deleteProduct(id) {
    return await this.productDao.deleteProduct(id);
  }
}
