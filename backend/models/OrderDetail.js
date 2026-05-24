const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema(
  {
    ordenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    nombresProductos: [{ type: String, required: true }],
    cantidad: { type: Number, required: true },
    precioTotal: { type: Number, required: true },
  },
  { timestamps: true },
); 

module.exports = mongoose.model("OrderDetail", OrderDetailSchema);
