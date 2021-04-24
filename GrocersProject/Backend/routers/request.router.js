let express = require("express");
const RequestRouter = require("../controllers/request.controller");
let router = express.Router();

router.get("/getAllRequests", RequestRouter.getAllRequests);
router.post("/createRequest", RequestRouter.createRequest);

module.exports = router;
