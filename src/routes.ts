import { Router } from "express";
import multer from "multer";

import { CreateUserControler } from "./controlers/user/CreateUserControler";
import { AuthUserControler } from "./controlers/user/AuthUserControler";
import { DetailUserControler } from "./controlers/user/DetailUserControler";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { CreateCategoryControle } from "./controlers/category/CreateCategoryControle";
import { ListCategoryControler } from "./controlers/category/ListCategoryControle";
import { CreateProductControler } from "./controlers/products/CreateProductControle";
import { ListByCategoryControler } from "./controlers/products/ListByCategoryControler";
import { CreateOrderControler } from "./controlers/order/CreateOrderControler";
import { RemoveOrderControler } from "./controlers/order/RemoveOrderControler";
import { AddItemControler } from "./controlers/order/AddItemControler";
import { RemoveItemControler } from "./controlers/order/RemoveItemControler";
import { SendOrderControler } from "./controlers/order/SendOrderControler";
import { ListOrderControler } from "./controlers/order/ListOrderControler";
import { DetailOrderControler } from "./controlers/order/DetailOrderControler";
import { FinishOrderControler } from "./controlers/order/FinishOrderControler";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Rotas User
router.post("/users", new CreateUserControler().handle);
router.post("/session", new AuthUserControler().handle);
router.get("/userinfo", isAuthenticated, new DetailUserControler().handle);

// Rotas Category
router.post("/category", isAuthenticated, new CreateCategoryControle().handle);
router.get("/category", isAuthenticated, new ListCategoryControler().handle);

// Rotas Products
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductControler().handle
);
router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryControler().handle
);

// Rotas Order
router.post("/order", isAuthenticated, new CreateOrderControler().handle);
router.delete("/order", isAuthenticated, new RemoveOrderControler().handle);

// Rotas Add itens a mesa
router.post("/add", isAuthenticated, new AddItemControler().handle);
router.delete("/add/remove", isAuthenticated, new RemoveItemControler().handle);

router.put("/send", isAuthenticated, new SendOrderControler().handle);
router.get("/orders", isAuthenticated, new ListOrderControler().handle);

router.get("/detail", isAuthenticated, new DetailOrderControler().handle);
router.put("/finish", isAuthenticated, new FinishOrderControler().handle)

export { router };
