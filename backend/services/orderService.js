const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

class OrderService {
  async createOrder(usuarioId, direccion) {
  
  const cart = await Cart.findOne({ usuarioId }).populate("items.productoId");
  if (!cart || cart.items.length === 0)
    throw new Error("El carrito está vacío o no existe");

  
  const order = new Order({
    usuarioId,
    carritoId: cart._id,
    precioTotal: cart.precioTotal,
    direccion,
  });
  const savedOrder = await order.save();

  
  const productosDetalle = [];

  
  for (const item of cart.items) {
    const producto = item.productoId;
    
    if (producto) {
      
      productosDetalle.push({
        nombresProductos: producto.name || "Producto sin nombre",
        cantidad: item.cantidad,
        precioUnitario: producto.price || 0 
      });

      
      await Product.findByIdAndUpdate(producto._id, {
        $inc: { stock: -item.cantidad },
      });
    }
  }

  
  const orderDetail = new OrderDetail({
    ordenId: savedOrder._id,
    productos: productosDetalle, 
    precioTotal: cart.precioTotal, 
  });
  await orderDetail.save();

 
  await Cart.findByIdAndDelete(cart._id);

  return { order: savedOrder, detail: orderDetail };
}

  async updateOrderAddress(orderId, newAddress) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { direccion: newAddress },
      { new: true },
    );
    if (!order)
      throw new Error("Orden no encontrada para actualizar dirección");
    return order;
  }

  async cancelOrder(orderId) {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) throw new Error("Orden no encontrada para eliminar");
    await OrderDetail.findOneAndDelete({ ordenId: orderId });
    return order;
  }
}

module.exports = new OrderService();