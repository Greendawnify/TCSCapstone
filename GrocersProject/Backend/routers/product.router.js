let express = require("express");
const ProductController = require("../controllers/product.controller");
let router = express.Router();

router.post("/addProduct", ProductController.addProduct);
router.post("/deleteProduct/:id", ProductController.deleteProduct);
router.post("/updateQuantity", ProductController.updateQuantity);

module.exports = router;
