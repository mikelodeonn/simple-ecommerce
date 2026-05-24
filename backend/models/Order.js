const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carritoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    precioTotal: { type: Number, required: true },
    direccion: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
