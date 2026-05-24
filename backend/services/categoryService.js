const Category = require("../models/Category");

class CategoryService {
  async createCategory(categoryData) {
    const category = new Category(categoryData);
    return await category.save();
  }

  async getAllCategories() {
    return await Category.find();
  }

  async getCategoryById(id) {
    const category = await Category.findById(id);
    if (!category) throw new Error("Categoría no encontrada");
    return category;
  }

  async updateCategory(id, updateData) {
    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!category) throw new Error("Categoría no encontrada para actualizar");
    return category;
  }

  async deleteCategory(id) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new Error("Categoría no encontrada para eliminar");
    return category;
  }
}

module.exports = new CategoryService();
