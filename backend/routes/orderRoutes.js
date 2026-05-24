const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router
  .route("/")
  .post(orderController.createOrder)
  .get(orderController.getOrders);

router
  .route("/:id")
  .get(orderController.getOrderById)
  .patch(orderController.updateAddress)
  .delete(orderController.deleteOrder);

module.exports = router;
