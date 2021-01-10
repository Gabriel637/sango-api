const express = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const ProductController = require("./controllers/ProductController");
const SessionController = require("./controllers/SessionController");
const OrderController = require("./controllers/OrderController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/products", ProductController.show);
routes.post("/create/product", upload.single('image'), ProductController.create);
routes.post("/create/user", SessionController.create);
routes.post("/pay", OrderController.create);
module.exports = routes;
