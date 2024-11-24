import { Router } from "express";
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

// Public Routes
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);

// Private Routes
router.post("/", authenticateJWT, authorize("admin"), createProductController);
router.put(
  "/:id",
  authenticateJWT,
  authorize("admin"),
  updateProductController
);
router.delete(
  "/:id",
  authenticateJWT,
  authorize("admin"),
  deleteProductController
);

export default router;
