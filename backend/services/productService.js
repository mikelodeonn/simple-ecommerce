const Product = require("../models/Product");

class ProductService {
  async createProduct(productData) {
    if (!productData.image || productData.image.trim() === '') {
      delete productData.image;
    }
    const product = new Product(productData);
    return await product.save();
  }

  async getAllProducts() {
    return await Product.find().populate('idCategoria', 'categoria');
  }

  async getProductById(id) {
    const product = await Product.findById(id).populate('idCategoria', 'categoria');
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  async updateProduct(id, updateData) {
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) throw new Error("Producto no encontrado para actualizar");
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error("Producto no encontrado para eliminar");
    return product;
  }
}

module.exports = new ProductService();
