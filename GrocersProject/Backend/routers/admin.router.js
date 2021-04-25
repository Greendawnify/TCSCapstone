let express = require("express");
const AdminRouter = require("../controllers/admin.controller");
let router = express.Router();

router.post("/addAdmin", AdminRouter.addAdmin);
router.get("/checkCredentials", AdminRouter.checkCredentials);

module.exports = router;
