const orderService = require("../services/orderService");

exports.createOrder = async (req, res, next) => {
  try {
    const { usuarioId, direccion } = req.body;
    const newOrderData = await orderService.createOrder(usuarioId, direccion);
    res.status(201).json({ success: true, data: newOrderData });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const orderData = await orderService.getOrderWithDetails(req.params.id);
    res.status(200).json({ success: true, data: orderData });
  } catch (error) {
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const updatedOrder = await orderService.updateOrderAddress(
      req.params.id,
      req.body.direccion,
    );
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await orderService.cancelOrder(req.params.id);
    res
      .status(200)
      .json({
        success: true,
        message: "Orden cancelada y eliminada correctamente",
      });
  } catch (error) {
    next(error);
  }
};
