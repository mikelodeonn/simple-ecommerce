const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router
  .route("/")
  .post(cartController.addItemToCart)
  .patch(cartController.updateItemQuantity);

router
  .route("/:usuarioId")
  .get(cartController.getCart)
  .delete(cartController.deleteCart);

module.exports = router;
