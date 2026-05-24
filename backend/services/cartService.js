const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartService {
  async addToCart(usuarioId, items) {
    let cart = await Cart.findOne({ usuarioId });
    if (!cart) {
      cart = new Cart({ usuarioId, items: [], precioTotal: 0 });
    }

    
    for (const item of items) {
      const product = await Product.findById(item.productoId);
      
      
      if (!product) {
        throw new Error(`El producto con ID ${item.productoId} no existe en la base de datos.`);
      }
      if (product.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para el producto: ${product.nombre}`);
      }

      const itemIndex = cart.items.findIndex(i => i.productoId.toString() === item.productoId.toString());
      if (itemIndex > -1) {
        cart.items[itemIndex].cantidad += item.cantidad;
      } else {
        cart.items.push({ productoId: item.productoId, cantidad: item.cantidad });
      }
    }

    
    let total = 0;
    for (const i of cart.items) {
      const prod = await Product.findById(i.productoId);
      
      
      if (prod && prod.price) {
        total += prod.price * i.cantidad;
      } else {
        throw new Error(`El producto con ID ${i.productoId} existe, pero no tiene un precio válido asignado.`);
      }
    }
    
    
    cart.precioTotal = total;

    return await cart.save();
  }

  async getCartByUserId(usuarioId) {
    const cart = await Cart.findOne({ usuarioId }).populate("items.productoId");
    if (!cart) throw new Error("El usuario no posee un carrito activo");
    return cart;
  }

  async updateCartItem(usuarioId, productoId, cantidad) {
    const cart = await Cart.findOne({ usuarioId });
    if (!cart) throw new Error('Carrito no encontrado');

    
    const itemIndex = cart.items.findIndex(i => {
      return i.productoId && i.productoId.toString() === productoId.toString();
    });

    if (itemIndex === -1) throw new Error('El producto no está en el carrito o los datos del carrito están corruptos');

    if (cantidad <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].cantidad = cantidad;
    }


    let total = 0;
    for (const i of cart.items) {
      if (i.productoId) { 
        const prod = await Product.findById(i.productoId);
        if (prod && prod.precio) {
          total += prod.precio * i.cantidad;
        }
      }
    }
    cart.precioTotal = total;

    return await cart.save();
  }

  async clearCart(usuarioId) {
    const cart = await Cart.findOneAndDelete({ usuarioId });
    if (!cart) throw new Error("No hay carrito para eliminar");
    return cart;
  }
}

module.exports = new CartService();
