let express = require("express");
let router = express.Router(); //router reference.
let TicketController = require("../controllers/ticket.controller.js");

//mapping sub path with http methods.
router.get("/getAllTickets", TicketController.getAllTickets);
router.post("/createTicket", TicketController.createTicket);
router.post("/updateTicket", TicketController.updateTicket);



module.exports = router;
