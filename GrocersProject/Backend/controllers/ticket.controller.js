let TicketModel = require("../models/ticket.model");

let createTicket = (req, res) => {
  let ticket = new TicketModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username:req.body.username,
    email:req.body.email,
    resolve:false
  });

  ticket.save((err, result) => {
    if (!err) {
      res.send("Ticket added");
    } else {
      res.send("Ticket not saved");
    }
  });
};
//http://localhost:9090/ticket/getAllTickets 
let getAllTickets = (req, res) => {
  TicketModel.find({}, (err, result) => {
    if (!err) {
      res.json(result);
    }
  });
};

//http://localhost:9090/ticket/getAllTickets
let updateTicket = (req, res) => {
let cId = req.body._id;
 let  resolved= req.body.resolve;

  TicketModel.updateMany(
    { _id: cId },
    { $set: { resolve: resolved } },
    (err, result) => {
      if (!err) {
        if (result.nModified > 0) {
          res.send("Ticket Record updated succesfully");
        } else {
          res.send("Ticket Record is not available");
        }
      } else {
        res.send("Error generated " + err);
      }
    }
  );
};


module.exports = { createTicket, getAllTickets,updateTicket};
