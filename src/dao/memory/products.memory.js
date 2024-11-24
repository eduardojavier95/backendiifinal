export default class ProductsMemory {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(id) {
    return this.products.find((product) => product.id === id) || null;
  }

  async createProduct(productData) {
    const product = { id: this.nextId++, ...productData };
    this.products.push(product);
    return product;
  }

  async updateProduct(id, productData) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index >= 0) {
      this.products[index] = { ...this.products[index], ...productData };
      return this.products[index];
    } else {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index >= 0) {
      const deletedProduct = this.products.splice(index, 1)[0];
      return deletedProduct;
    } else {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
  }
}
