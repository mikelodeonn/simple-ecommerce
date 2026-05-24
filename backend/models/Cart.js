const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        cantidad: { type: Number, required: true, min: 1 },
      },
    ],
    precioTotal: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", CartSchema);
