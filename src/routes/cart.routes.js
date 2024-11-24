import { Router } from "express";
import {
  addProductToCartController,
  purchaseCart,
} from "../controllers/cart.controller.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

router.post(
  "/add",
  authenticateJWT,
  authorize("user"),
  addProductToCartController
);
router.post("/:cid/purchase", authenticateJWT, purchaseCart);

export default router;
