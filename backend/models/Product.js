const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    idCategoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number, required: true, default: 0 },
    image: { 
    type: String, 
    default: 'https://via.placeholder.com/150' 
  }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);
