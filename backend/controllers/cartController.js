const cartService = require("../services/cartService");

exports.addItemToCart = async (req, res, next) => {
  try {
    const { usuarioId, items } = req.body;
    const updatedCart = await cartService.addToCart(usuarioId, items);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCartByUserId(req.params.usuarioId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

exports.updateItemQuantity = async (req, res, next) => {
  try {
    const { usuarioId, productoId, cantidad } = req.body;
    const updatedCart = await cartService.updateCartItem(
      usuarioId,
      productoId,
      cantidad,
    );
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    await cartService.clearCart(req.params.usuarioId);
    res
      .status(200)
      .json({ success: true, message: "Carrito vaciado exitosamente" });
  } catch (error) {
    next(error);
  }
};
